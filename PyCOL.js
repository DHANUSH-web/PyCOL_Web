// PyCOL by Dhanush H V
// to get the slider values
const getSliderValues = () => {
    let r = parseInt(document.getElementById("RSlide").value);
    let g = parseInt(document.getElementById("GSlide").value);
    let b = parseInt(document.getElementById("BSlide").value);
    return [r, g, b];
};

// to get the spin box values
const getSpinBoxValues = () => {
    let r = parseInt(document.getElementById("RSet").value);
    let g = parseInt(document.getElementById("GSet").value);
    let b = parseInt(document.getElementById("BSet").value);
    return [r, g, b];
};

// update sliders
const setSliderValues = (color) => {
    document.getElementById("RSlide").value = color[0];
    document.getElementById("GSlide").value = color[1];
    document.getElementById("BSlide").value = color[2];
};

// update SpinBox
const setSpinBoxValues = (color) => {
    document.getElementById("RSet").value = color[0];
    document.getElementById("GSet").value = color[1];
    document.getElementById("BSet").value = color[2];
};

// to get the hex color of a given value
const toHex = (color) => {
    let hex = color.toString(16);

    return hex.length == 1 ? "0" + hex : hex;
};

// to get the approximate hex color
const getHex = (color) => {
    return "#" + toHex(color[0]) + toHex(color[1]) + toHex(color[2]);
};

// to get the main colors
const getRGB = (hex) => {
    if (hex.length == 6) {
        let r, g, b;

        r = hex.substring(0, 2);
        g = hex.substring(2, 4);
        b = hex.substring(4, 6);

        r = parseInt(r, 16);
        g = parseInt(g, 16);
        b = parseInt(b, 16);

        return [r, g, b];
    } else
        notifier(
            "Please enter a valid hex color code",
            2,
            "https://cdn-icons-png.flaticon.com/512/595/595067.png"
        );
};

// to update all entities
const showColor = () => {
    let color = getHex(getSliderValues()).toUpperCase();
    document.getElementById("hexCode").innerHTML = color;
    document.getElementById("showColor").style.backgroundColor = color;
};

// updates all the entity when sliders are triggerred
const triggerSlide = (value, id) => {
    if (parseInt(value) < 0 || parseInt(value) > 255 || value.length == 0)
        notifier(
            "Invalid value",
            2,
            "https://cdn-icons-png.flaticon.com/512/595/595067.png",
            false,
            true,
            "bottom",
            "center",
            "#ff7675",
            "#d63031"
        );
    document.getElementById(id).value = value;
    showColor();
};

// to apply custom colors
const applyColor = () => {
    let color = document.getElementById("userIn").value;

    if (color.length > 1) {
        color = color.toUpperCase();

        if (color[0] == "#") {
            if (color.length <= 7) {
                color = color.substring(1, color.length);
                let c = getRGB(color);
                setSliderValues(c);
                setSpinBoxValues(c);
                showColor();
            } else
                notifier(
                    "Please enter valid color value",
                    2,
                    "https://cdn-icons-png.flaticon.com/512/4344/4344882.png",
                    false,
                    false,
                    "bottom",
                    "center",
                    false,
                    "#0050ffee",
                    "#0050ff"
                );
        } else {
            color = color.split(" ");
            let r, g, b;
            r = parseInt(color[0]);
            g = parseInt(color[1]);
            b = parseInt(color[2]);

            setSliderValues([r, g, b]);
            setSpinBoxValues([r, g, b]);
            showColor();
        }
    } else {
        notifier(
            "Please enter colour values as RGB or Hex code",
            2,
            "https://cdn-icons-png.flaticon.com/512/4344/4344882.png",
            false,
            false
        );
    }
};

const copyHexCode = () => {
    let hex = getHex(getSliderValues()).toUpperCase();
    navigator.clipboard.writeText(hex);
    document.getElementById("hexCode").innerHTML = "Copied " + hex;
};

const copyRGB = () => {
    let rgb = getSpinBoxValues();
    rgb = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    navigator.clipboard.writeText(rgb);
};

const generateRandomColors = () => {
    let r = parseInt(Math.random() * 255);
    let g = parseInt(Math.random() * 255);
    let b = parseInt(Math.random() * 255);
    let hex = getHex([r, g, b]).toUpperCase();
    setSliderValues([r, g, b]);
    setSpinBoxValues([r, g, b]);
    showColor();
};

const notifier = (
    string,
    sleep,
    icon = "",
    new_window = true,
    close = true,
    grav = "bottom",
    pos = "center",
    stop_on_focus = false,
    bg_color = "#5352edee",
    border_color = "none"
) => {
    let toast = Toastify({
        text: string,
        duration: sleep * 1000,
        className: "info",
        destination: 'http://www.pycol.netlify.app/',
        newWindow: new_window,
        close: close,
        gravity: grav,
        position: pos,
        stopOnFocus: stop_on_focus,
        avatar: icon,
        style: {
            background: bg_color,
            fontWeight: "bold",
            fontFamily: "pycol",
            fontSize: "12px",
            border: `solid 2px ${
                border_color == "none" ? bg_color : border_color
            }`,
            borderRadius: "10px",
            boxShadow: "0 0 12px 2px #00000055",
            width: "500px",
        },
        oldestFirst: false,
    });

    toast.showToast();
};

const showKeys = () => {
    const keys =
        "\nCtrl+P to Apply Custom color\nCtrl+R to Generate Random Color";
    notifier(
        keys,
        3,
        "https://cdn-icons-png.flaticon.com/512/471/471662.png",
        true,
        true,
        "bottom",
        "center",
        false,
        "#00b894",
        "#0050ffee",
        "#0050ff"
    );
};

// shortcut key to call generate random colos
document.addEventListener(
    "keydown",
    (e) => {
        if (e.ctrlKey && String.fromCharCode(e.keyCode) == "R") {
            e.preventDefault();
            e.stopPropagation();
            generateRandomColors();
        }
    },
    false
);

document.addEventListener(
    "keydown",
    (e) => {
        if (e.ctrlKey && String.fromCharCode(e.keyCode) == "C") {
            e.preventDefault();
            e.stopPropagation();
            let color = getHex(getSliderValues()).toUpperCase();
            copyHexCode(color);
            notifier(
                `Copied ${color}`,
                1,
                "",
                false,
                true,
                "bottom",
                "center",
                false,
                "#005050ee",
                "#005050"
            );
        }
    },
    false
);

document.addEventListener(
    "keydown",
    (e) => {
        if (e.ctrlKey && String.fromCharCode(e.keyCode) == "P") {
            e.preventDefault();
            e.stopPropagation();
            applyColor();
        }
    },
    false
);

document.addEventListener(
    "keydown",
    (e) => {
        if (e.shiftKey && e.ctrlKey && String.fromCharCode(e.keyCode) == "C") {
            e.preventDefault();
            e.stopPropagation();
            copyRGB();
        }
    },
    false
);

window.onload = () => {
    notifier(
        'Thank you for trying PyCOL-Preview\n\nPyCOL - Web Updated Version is released\nPlease click here to try it',
        7,
        "",
        false,
        false,
        "top",
        "center",
        false,
        "#0050ffee",
        "#0050ff"
    );
};
