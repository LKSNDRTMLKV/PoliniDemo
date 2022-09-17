function dateHelper (created, time) {
    let dateNow = new Date(Date.now());
    let productDate = new Date(created);
    let isNewProduct = dateNow - productDate < (time ? time :  30 * 24 * 60 * 60 * 1000) ? true : false;
    return isNewProduct;
}

export default dateHelper;