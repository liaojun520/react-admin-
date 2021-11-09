import React, {Component} from 'react';
import "./style.less";


class SvgIcon extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {icon, className} = this.props;
        const styleExternalIcon = {
            mask: `url(${icon}) no-repeat 50% 50%`,
            WebkitMask: `url(${icon}) no-repeat 50% 50%`
        };

        const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path);

        return (
            <>
                {isExternal(icon) ?
                    <div style={styleExternalIcon} className={`svg-external-icon svg-icon ${className}`}/> :
                    <svg className={`svg-icon ${className}`} aria-hidden="true">
                        <use xlinkHref={`#icon-${icon}`}/>
                    </svg>
                }
            </>
        );
    }
}

export default SvgIcon;