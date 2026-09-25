import './loading.scss';

function Loading({ borderColor = "#FFF", position = "center", }) {
    return (
        <div
            className={`loading loading-${position}`}
            style={{ "--loader-border-color": borderColor, }} >
            <span className="loader"></span>
        </div>);
}

export default Loading;