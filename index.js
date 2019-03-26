'use strict';
const img = React.createElement;

class Image extends React.Component {
    constructor(props) {
    super(props);
    this.state= { data: null }
    }

    componentDidMount() {
        fetch('https://www.reddit.com/r/<%= title %>.json')
            .then(response => response.json())
            .then(post => this.setState({ author: post.data.author,
                link: post.data.url,
                img: post.data.thumbnail,
                title: post.data.title,
                jpeg : post.data.url.endsWith("jpg")
            }));
    }

    render(){
            return img(
                <a href="this.state.img">
                <img src="this.state.link"/>
                </a>
            )
        }
}

ReactDOM.render(img(Image), document.getElementById("app"));