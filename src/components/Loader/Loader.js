import { InfinitySpin } from "react-loader-spinner";
import loader from './loader.module.css'


const Loader = () => {
    return (
        <div className={loader.loader}>
            <InfinitySpin 
                width='200'
                color="#4fa94d"
/>
        </div>
    )
}

export default Loader;