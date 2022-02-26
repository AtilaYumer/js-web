const { add } = require('lodash');
const Ad = require('../models/Ad');

async function getFirstThreeAds() {
    return await Ad.find().limit(3).lean();
}

async function getAllAds() {
    return await Ad.find().populate('applications').lean();
}

async function createAd(body, userId) {
    const ad = new Ad({
        headline: body.headline,
        location: body.location,
        companyName: body.companyName,
        companyDescription: body.companyDescription,
        author: userId
    });
    await ad.save();
}

async function getAdById(id) {
    return await Ad.findById(id).populate('author').lean();
}

async function getAdWithoutLean(id) {
    return await Ad.findById(id);
}

async function updateAd(ad, body) {
    ad.headline = body.headline;
    ad.location = body.location;
    ad.companyName = body.companyName;
    ad.companyDescription = body.companyDescription;

    await ad.save();
}

async function deleteAd(id) {
    return await Ad.deleteOne({ _id: id });
}

async function search(searchText) {
    const ads = await Ad.find().populate('author');
    return ads
    .map(add => ({ headline: add.headline, companyName: add.companyName, email: add.author.email }))
    .filter(ad => ad.email.toUpperCase() === searchText.toUpperCase());
}

module.exports = {
    getFirstThreeAds,
    getAllAds,
    createAd,
    getAdById,
    getAdWithoutLean,
    updateAd,
    deleteAd,
    search
}