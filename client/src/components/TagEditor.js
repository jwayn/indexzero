import React, { Component } from 'react';
import RenderedTag from './RenderedTag';

export default class TagEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }
    }

    renderTag(name, key) {
        return <RenderedTag name={name} key={key} index={key} removeTag={this.removeTag} />;
    }

    removeTag = index => {
        let tags = [...this.state.tags];
        let tagToDelete = tags.find(tag => tag.key === index);
        tags.splice(tags.indexOf(tagToDelete), 1);
        this.setState({tags})
    }

    renderTags = event => {
        let tag = event.target.value;
        if(tag.charAt(tag.length - 1) === ' ' && tag.charAt(0) !== ' ') {
            this.setState(prevState => ({
                tags: [...prevState.tags, {name: tag.trim(), key: this.state.tags.length}]
            }));
            event.target.value = '';
        }
    }

    render() {
        return (
            <div className="form-container__group">
                <label className="input__label">Tags</label>
                <input className="input__text-box" onChange={this.renderTags} />
                <div className="tags__rendered">
                    {this.state.tags.map(tag => {
                        return this.renderTag(tag.name, tag.key);
                    })}
                </div>
            </div>
            
        )
    }

}