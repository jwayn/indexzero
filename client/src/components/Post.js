import React, { Component } from 'react';
import './Post.css';
import viewsIcon from '../images/views.svg';
import commentsIcon from '../images/comments.svg';
import likesIcon from '../images/likes.svg';

export default class Post extends Component {

    render() {
        console.log(this.props);
        return(
            <div className='post'>
                <div className={`post__identity post__identity--${this.props.value.identity}`}></div>
                <div className='post__information'>
                    <div className="post__information__title">
                        <h2 className="post__information__title__heading">
                            {this.props.value.summary}
                        </h2>
                    </div>
                    <div className="post__information__subinfo">
                        <div className="post__information__subinfo__tags">

                        </div>
                        <div className="post__information__subinfo__stats">
                            <div className="post__information__subinfo__stats__interactions">
                                <img src={viewsIcon} className="post__information__subinfo__stats__interactions__icon" alt="Views"></img>
                                <span className="post__information__subinfo__stats__interactions__views"></span>
                                <img src={commentsIcon} className="post__information__subinfo__stats__interactions__icon" alt="Comments"></img>
                                <span className="post__information__subinfo__stats__interactions__comments"></span>
                                <img src={likesIcon} className="post__information__subinfo__stats__interactions__icon" alt="Likes"></img>
                                <span className="post__information__subinfo__stats__interactions__likes"></span>
                            </div>
                            <div className="post__information__subinfo__stats__action">
                                <p className="post__information__subinfo__stats__action__text">
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}