import { Component } from "react";
import css from './css.module.css'

class Modal extends Component{


    componentDidMount() {
        document.body.addEventListener('keydown', this.handleClose)
    }

    componentWillUnmount() {
        document.body.removeEventListener('keydown',this.handleClose)
    }

    handleClose=({target,currentTarget,code})=>{
        if (target === currentTarget||code==='Escape') {
            this.props.close()
        }
    }


    render() {
        const { children } = this.props;
        return (
            <>
            <div className={css.overlay} onClick={this.handleClose}>
                <div className={css.modal}>
                    {children}
                </div>
                </div>
                </>
        )
    }

}
export default Modal;