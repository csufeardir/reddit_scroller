/* eslint-disable no-unused-expressions */

//Import Components
import React, { Component } from "react";
import "./App.css";
import Image from "./components/Image_Component/Image";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import BottomScrollListener from "react-bottom-scroll-listener";
import Circular from "./components/Circular_Component/Circular"
import Stop from "./components/Stop_Component/Stop"
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from './components/Appbar_Component/Appbar'
//

//App Component
class App extends Component {
    //Constructor and State
    constructor(props) {
        super(props);
        this.state = { subReddit: "", images: [] , inputValue: '',  notManyPictures:true, gifs:false};
    }
    //
    //Define variables to determine number of images fetched
    previousLength = 0;                 //How many images found in previous scroll
    arr2 = []                           //Array to store images before putting into state
    arr3 = []                           //Array to store all posts' user IDs
    last;                               //ID of last post in the last-1 page
    last2;                              //ID of last post in the last page
    count = 0;                          //Number to request new pages
    scrollCount = 0;                    //How many scrolls to get min. 15 images
    scrollCountTotal =0;                //How many scrolls in one subreddit
    fetchCounter = 0;                   //How many fetches has been done
    reg;                                //Reg to use
    reg1 = /.jpg$|.jpeg$|.png$|.gif$/   //Reg including gifs
    reg2 = /.jpg$|.jpeg$|.png$/         //Reg excluding gifs

    //Fetch JSON Data After Getting Subreddit URL
    callReddit = (subReddit) => {
        if(this.state.gifs)
            this.reg=this.reg1;
        else
            this.reg=this.reg2;
        fetch(subReddit)
                    .then(res=>res.json())
                    .then(res=> {
                        for(var post in res.data.children){
                            let data = (res.data.children[post].data);
                            this.arr3.push(data.id)
                            if(this.reg.test(data.url))
                            this.arr2.push({
                                'src': data.url,
                                'author': data.author,
                                'img': data.thumbnail,
                                'title': data.title,
                                'perma': data.permalink,
                                'id': data.id})
                        }
                        //Compare last posts of last 2 pages
                        if(this.fetchCounter%2===0)
                        this.last= this.arr3[this.arr3.length-1];
                        else if(this.fetchCounter%2===1)
                            this.last2=this.arr3[this.arr3.length-1]
                        this.fetchCounter+=1;
                        //
                        //Get a minimum of 15 images per scroll
                        if((this.arr2.length-this.previousLength)>=15){
                            this.setState({images:this.arr2})
                            this.previousLength=this.arr2.length;
                            this.scrollCount=0;

                        }else if((this.arr2.length-this.previousLength)<15 && !this.state.notManyPictures)
                            this.listenToScroll()
                        //

                    })

    }


    //Functions
    //Reset everything to default and Fetch again
    clickHandler = () => {
        this.previousLength = 0;
        this.arr2 = [];
        this.count = 0;
        this.scrollCount = 0;
        this.scrollCountTotal=0;
        this.last = '';
        this.last2 = '';
        this.setState({images: [], subReddit:this.state.inputValue, notManyPictures:false}, ()=>
            this.callReddit(this.state.inputValue)
        )
    }
    //
    //Get new images when scrolled to bottom
    listenToScroll = () => {
        this.scrollCount += 1;
        if((this.scrollCount>=21 && this.arr2.length-this.previousLength <=10) || this.scrollCountTotal>=500 ||
            this.last===this.last2){
            this.setState({notManyPictures:true, images:this.arr2})
        }
        if(!this.state.notManyPictures){
            var lastDecider = this.fetchCounter%2 ? this.last : this.last2
            this.count += 25;
            this.scrollCountTotal += 1;
            this.callReddit(this.state.inputValue+'?count='+this.count+'&after=t3_'+lastDecider)
        }
    }
    //
    //Update Input
    updateInputValue = (evt) => {
        this.setState({inputValue: 'https://www.reddit.com/r/'+evt.target.value+'.json'})
    }
    //
    //Change state to include/exclude gifs
    switchHandler = () => {
        if(!this.state.gifs)
        this.setState({gifs:true},()=>this.clickHandler())
        else
            this.setState({gifs:false},()=>this.clickHandler())

        console.log('switched')
    }
    //


    //Render
    render() {
        return (
            <div>
                <AppBar/>
                <br/><br/><br/>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <TextField variant="outlined" margin="normal" label="Subreddit" placeholder='Subreddit'
                           style={{width:"50%"}} val={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
                <BottomScrollListener onBottom={this.listenToScroll} />
            <div className="App" style={{backgroundColor:'white'}} >

    <br/>
    <Button variant="outlined" color="secondary" onClick={this.clickHandler}>Scroll!</Button>&ensp;
                <FormControlLabel control={                <Switch
                    onChange={this.switchHandler}
                />} label='Gifs' />

                <br/><br/>
    <Image data={this.state.images}/>

            </div>
                { !this.state.notManyPictures ? <Circular /> : null }
            </Grid>
                <center>{ (this.state.notManyPictures&&this.state.subReddit!=="") ? <Stop /> : null }</center>
            </div>

        );

    }
}
//

export default App;
