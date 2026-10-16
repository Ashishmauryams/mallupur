import './loading.scss';

function Loading({ borderColor = "#FFF", position = "center", height = "100vh" }) {
    return (
        <div
            className={`loading loading-${position}`}
            style={{ "--loader-border-color": borderColor, "--height-loader": height }} >
            <span className="loader"></span>
        </div>);
}

export default Loading;