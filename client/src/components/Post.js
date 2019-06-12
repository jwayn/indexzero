import React, { Component } from 'react';
import moment from 'moment';
import './Post.css';
import Tag from './Tag';
import viewsIcon from '../images/views.svg';
import commentsIcon from '../images/comments.svg';
import likesIcon from '../images/likes.svg';

export default class Post extends Component {

    constructor() {
        super();
        this.state = {
            author: '',
            tags: []
        }
    }

    componentDidMount() {
        this.getAuthor(this.props.post.author);
        this.getTags(this.props.post.id);
    }

    evaluateIdentity(identity){
        switch(identity) {
            case 'article':
                return 'Created';
            case 'asked':
                return 'Asked';
            case 'answered':
                return 'Answered';
            default:
                return null;
        }
    }

    getAuthor(id){
        fetch(`/api/users/id=${id}`)
        .then(res => res.json())
        .then(author => {
            this.setState({author: author.displayName});
        });
    }


    getTags(postID) {
        fetch(`/api/posts/${postID}/tags`)
        .then(res => res.json())
        .then(data => {
            const tags = data.tags;
            tags.sort((a, b) => a.name.localeCompare(b.name))
            this.setState({tags});
        });
    }

    renderTag(tagName, tagID) {
        return <Tag key={tagID} name={tagName} />
    }

    render() {
        this.post = this.props.post;
        return(
            <div className='post'>
                <div className={`post__identity post__identity--${this.post.identity}`}></div>
                <div className='post__information'>
                    <div className="post__information__title">
                        {/* TODO 
                            Add react router to click the title to go to post
                        */}
                        <h2 className="post__information__title__heading">
                            {this.post.summary}
                        </h2>
                    </div>
                    <div className="post__information__subinfo">
                        <div className="post__information__subinfo__tags">
                            {this.state.tags.map(tag => {
                                return this.renderTag(tag.name, tag.id);
                            })}
                        </div>
                        <div className="post__information__subinfo__stats">
                            <div className="post__information__subinfo__stats__interactions">
                                {/* TODO 
                                    Add logic to properly gather the stats
                                */}
                                <img src={viewsIcon} className="post__information__subinfo__stats__interactions__icon" alt="Views"></img>
                                <span className="post__information__subinfo__stats__interactions__views">{this.post.views || 0}</span>
                                <img src={commentsIcon} className="post__information__subinfo__stats__interactions__icon" alt="Comments"></img>
                                <span className="post__information__subinfo__stats__interactions__comments">{this.post.comments || 0}</span>
                                <img src={likesIcon} className="post__information__subinfo__stats__interactions__icon" alt="Likes"></img>
                                <span className="post__information__subinfo__stats__interactions__likes">{this.post.likes || 0}</span>
                            </div>
                            <div className="post__information__subinfo__stats__action">
                                <p className="post__information__subinfo__stats__action__text">
                                    {/* TODO 
                                        Add react router to click the user to go to profile
                                    */}
                                    <span title={moment(this.post.created).format('MMMM Do YYYY, h:mm:ss a')}>
                                        {`${this.post.identity == 'article' ? 'Created' : this.post.identity[0].toUpperCase() + this.post.identity.substring(1)} ${moment(this.post.created).fromNow()} ago by `} 
                                    </span>
                                    <span className="post__information__subinfo__stats__action__text__username">
                                        {this.state.author}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}