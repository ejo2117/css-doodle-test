function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shiftColors(doodle) {
    $('css-doodle').fadeOut(400, function () {
        let x = randomInteger(0, 1280)
        let y = randomInteger(0, 2071)
        let msg = x % y;

        c1 = 'rgb(' + (msg * x) % 254 + ',' + (msg * y) % 254 + ',' + (msg) % 254 + ')';

        console.log(c1);
        hex1 = rgbToHex((msg * x) % 254, (msg * y) % 254, (msg) % 254)
        hex2 = rgbToHex((msg * 387 * x) % 254, (msg * 947 * y) % 254, (msg * 812) % 254)
        hex3 = rgbToHex((msg * 37 * x) % 254, (msg * 9 * y) % 254, (msg * 82) % 254)

        console.log(hex1, hex2, hex3)
        $('css doodle')
        /* update styles and refresh */
        doodle.update(`
    :doodle { @grid: 50x1 / 100%; }
:container { animation: r 80s linear
infinite; }
@place-cell: center;
@size: 100% 2vmin; background:
@pd(`+ hex1 + `, ` + hex2 + `, ` + hex3 + `); transform-origin: 1vmin center; transform:
translateX(50%) rotate(calc(@i() * 360deg / @size()));
@keyframes r { to {
transform: rotate(1turn) } }
     
    `);
        $('css-doodle').fadeIn(400)
    })

}
function beginAuto() {

    let interval = setInterval(() => {
        shiftColors(doodle)
    }, 5000);
}
$(() => {
    console.log('load')

    let slider1 = $('#frequencySlider');
    let slider2 = $('#octaveSlider');
    let slider3 = $('#scaleSlider');

    slider1[0].oninput = function () {
        let freq = Math.log(this.value) / 100

        $('#svgFilter feTurbulence').attr('baseFrequency', freq)

    }
    slider2[0].oninput = function () {
        let oct = this.value;

        $('#svgFilter feTurbulence').attr('numOctaves', oct)
    }
    slider3[0].oninput = function () {
        let scale = this.value;
        $('#svgFilter feDisplacementMap').attr('scale', scale)
    }
    const doodle = document.querySelector('css-doodle');

    // event = keyup or keydown
    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
            shiftColors(doodle)
        }
    })



    $(document).on('click', function () {
        $('.controller').toggleClass('hiding')
    });


})