const styles = {
    "navbar": {
        "display": "flex",
        "background-color": "lightgray",
        "flex-direction": "row",
        "justify-content": "space-evenly",
        "align-items": "center",
        "height": "7vh",
        "top": 0,
        "left": 0,
        "position": "fixed",
        "width": "-webkit-fill-available",
        "z-index": 99
    },
    "navbarDivs": {
        "display": "flex",
        "cursor": "pointer",
        "width": "-webkit-fill-available",
        "height": "100%",
        "alignItems": "center",
        "justify-content": "center",
        ":hover": {
            "transition": "all 0.2s ease-out",
            "boxShadow": "0px 0px 0px rgba(38, 38, 38, 0.2)",
            "border": "1px solid #cccccc",
            "backgroundColor": "white",
            "minWidth": "min-content",
            "minWeight": "min-content"
        }
    }
};  

export default styles;