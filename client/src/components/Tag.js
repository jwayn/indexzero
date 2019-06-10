import React, { Component } from 'react';


export default class Tag extends Component {
    
    render() {
        //TODO: Make this into a link to tag page
        return(
            <span className='post__information__subinfo__tags__tag'>{this.props.name}</span>
        )
    }
}
        