// const stylelintConfig = require('./stylelint.config');

module.exports = {
    plugins: [
        require('postcss-import'),
        // require('stylelint')(stylelintConfig),
        require('postcss-flexbugs-fixes'),
        require('autoprefixer')({
            autoprefixer: {
                flexbox: 'no-2009'
            },
            stage: 3
        }),
        require('postcss-px-to-viewport')({
            unitToConvert: 'px',
            viewportWidth: 750,
            unitPrecision: 5,
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: ['.ignore','.hairlines',/^(?!\.m-mb-)/],
            minPixelValue: 1,
            mediaQuery: false
        })
    ]
}
