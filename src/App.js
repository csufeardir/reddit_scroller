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
//
//App Component
class App extends Component {
    //Constructor and State
    constructor(props) {
        super(props);
        this.state = { subReddit: "", images: [] , inputValue: '',  notManyPictures:true};
    }

    //Define variables to determine number of images fetched
    previousLength = 0; // Variable to store how many images are rendered on previous scroll
    arr2 = [] // Array to store images before putting into state
    arr3 = [] // Array to store all posts' user IDs
    last;
    count = 0;
    scrollCount = 0;
    reg = /.jpg$|.jpeg$|.png$|.gif$/
    //Run callReddit to Fetch JSON Data Right After Getting Subreddit URL
    callReddit = (subReddit) => {
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
                        this.last= this.arr3[this.arr3.length-1];

                        if((this.arr2.length-this.previousLength)>=15){
                            this.setState({images:this.arr2})
                            this.previousLength=this.arr2.length;

                        }else if((this.arr2.length-this.previousLength)<15 && !this.state.notManyPictures)
                            this.listenToScroll()


                    })

    }


    //Functions
    clickHandler = () => {
        this.previousLength = 0;
        this.arr2 = [];
        this.count = 0;
        this.scrollCount = 0;
        this.setState({images: [], subReddit:this.state.inputValue, notManyPictures:false}, ()=>
            this.callReddit(this.state.inputValue)
        )

    }


    listenToScroll = () => {
        if((this.scrollCount>=15 && this.arr2.length <=15) || this.scrollCount>=500){
            this.setState({notManyPictures:true})
        }


            this.count += 25;
            this.scrollCount += 1;
            this.callReddit(this.state.inputValue+'?count='+this.count+'&after=t3_'+this.last)

    }

    //Update Input
    updateInputValue = (evt) => {
        this.setState({inputValue: 'https://www.reddit.com/r/'+evt.target.value+'.json'})
    }



    //Render
    render() {
        if (this.state.subReddit!=='') return (

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
    <Button variant="outlined" color="secondary" onClick={this.clickHandler}>Scroll!</Button>
                <div><br/></div><br/>
    <Image data={this.state.images}/>
                { this.state.notManyPictures ? <Stop /> : null }
            </div>
                { !this.state.notManyPictures ? <Circular /> : null }
            </Grid>

        );

        if(this.state.subReddit==='') return(
            <div> <div className="App" style={{backgroundColor:'white'}} >
                <TextField variant="outlined" margin="normal" label="Subreddit" placeholder={this.state.subReddit}
                           style={{width:"50%"}} val={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
                <br/>
                <Button variant="outlined" color="secondary" onClick={this.clickHandler}>Scroll!</Button>
            </div></div>
        )


    }
}
//

export default App;
