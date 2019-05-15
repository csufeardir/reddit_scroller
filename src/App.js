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
import Appbar from "./components/Appbar_Component/Appbar"
import SimpleAppBar from "./components/SimpleAppBar_Component/SimpleAppBar"
//
//App Component
class App extends Component {
    //Constructor and State
    constructor(props) {
        super(props);
        this.state = { subReddit: "", images: [] , inputValue: ''};
    }
    //


    //Run callReddit to Fetch JSON Data Right After Getting Subreddit URL
    callReddit = (subReddit) => {
        fetch(subReddit)
                    .then(res=>res.json())
                    .then(res=> {

                        //Loop Through JSON and Set Image Data to State
                        for(var post in res.data.children){
                            let data = (res.data.children[post].data);
                            if(data.url.endsWith('.jpg'||'.png'||'jpeg'))
                            this.setState( prevState=> ({ images: [...prevState.images, {
                                'src': data.url,
                                'href': data.url,
                                'author': data.author,
                                'img': data.thumbnail,
                                'title': data.title,
                                    'perma':data.permalink,
                                    'id':data.id,
                            }], count: 0 })),

                                //After Setting Image Data, Render.
                                function(){
                                this.render();
                            }}
                        }
                    )

            }



    //LifeCycle
    componentDidMount() {
     // this.callReddit(this.state.subReddit);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }

    //Functions
    listenToScroll = () => {
        var lastid = this.state.images[this.state.images.length-1].id
        let count =+ this.state.count+25
        this.callReddit(this.state.inputValue+'?count='+count+'&after=t3_'+lastid)
    }


    updateInputValue = (evt) => {
        this.setState({inputValue: 'https://www.reddit.com/r/'+evt.target.value+'.json'})
    }


    //onClick Handler
    clickHandler = () => {
        this.setState({images: [], subReddit:this.state.inputValue})
        this.callReddit(this.state.inputValue)
        console.log(this.state.images)

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
            </div>
                <Circular/>
            </Grid>

        );

        if(this.state.subReddit==='') return(
            <div> <div className="App" style={{backgroundColor:'white'}} >
                <TextField variant="outlined" margin="normal" label="Subreddit" placeholder={this.state.subReddit}
                           style={{width:"50%"}} val={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
                <br/>
                <Button variant="outlined" color="secondary" onClick={this.clickHandler}>Scroll!</Button>
                <Image data={this.state.images}/>
            </div></div>
        )
    }
}
//

export default App;
