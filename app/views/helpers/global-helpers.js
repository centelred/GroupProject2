/** handlebars global helper functions
**/

module.exports = {
    getCurrentYear() {
        return new Data().getFullYear().toString();
    }
};