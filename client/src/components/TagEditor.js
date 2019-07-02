import React, { Component } from 'react';
import RenderedTag from './RenderedTag';

export default class TagEditor extends Component {

    renderTag(name, key) {
        return <RenderedTag name={name} key={key} index={key} removeTag={this.props.removeTag} />;
    }

    render() {
        return (
            <div className="form-container__group">
                <label className="input__label">Tags</label>
                <input className="input__text-box" onChange={this.props.renderTags} />
                <div className="tags__rendered">
                    {this.props.tags.map(tag => {
                        return this.renderTag(tag.name, tag.key);
                    })}
                </div>
            </div>
            
        )
    }

}