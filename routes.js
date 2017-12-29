const express = require('express');
const router = express.Router();
var ZillowSale = require('./model/zillowSale');
var ZillowRentals = require('./model/zillowRentals');
var shell = require('shelljs');

function createPcodesFilter(filters) {
    [pstam, parr] = filters.split('=');
    if(parr.includes('&')) {
        parr = parr.split('&');
        parr = parr.map(element => parseInt(element));
    }
    console.log(parr);
    return parr;
}

function createBListFilter(filters) {
    [bstam, barr] = filters.split('=');
    blackl = [];
    if(barr.includes('&')) {
        barr = barr.split('&');
        barr.forEach(elem => {
            blackl.push({title: {$not: new RegExp("^"+elem+".*")}})
        });
    } else {
        blackl.push({title: {$not: new RegExp("^"+barr+".*")}})
    }
    console.log(blackl);
    return blackl;
}

function createBListAndPCodesFilter(filters) {
    let [p, b] = filters.split(';');
    let parr = createPcodesFilter(p);
    let blackl = createBListFilter(b);
    blackl.push({postal_code: {$in: parr}});
    console.log(blackl);
    return blackl;
}

router.get('/', function(req, res) {
    console.log('Got main route')
    res.json({ message: 'API Initialized!'});
});

router.route('/rentals')
.get(function(req, res) {
    ZillowRentals.find(function(err, rentals) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        console.log("Rentals sent");
        res.json(rentals);
    });
});

router.route('/rentals/:filters')
.get(function(req, res) {
    let filters = req.params.filters;

    [pstam, parr] = filters.split('=');
    let argpcodes = parr
    if(parr.includes('&')) {
        parr = parr.split('&');
        parr = parr.map(element => parseInt(element));
        argpcodes = parr.join(' ');
    }

    console.log(argpcodes);
    const { stdout, stderr, code } = shell.exec('/home/oleg/projects/Python/zillow_1/python-zillow/run_zillow_scraps.sh rent ' + argpcodes);
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
    console.log("code:", code);

    if (filters.includes('p=') && filters.includes('b=')) {
        const filter = createBListAndPCodesFilter(filters);
        ZillowRentals.find(
            { $and: filter}, function(err, rentals) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            console.log("Rentals filters sent");
            res.json(rentals);
        });
    } else if (!filters.includes('p=')) {
        const filter = createBListFilter(filters); 
        ZillowRentals.find(
            { $and: filter}, function(err, rentals) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            console.log("Rentals filters sent");
            res.json(rentals);
        });
    } else if (!filters.includes('b=')) {
        const filter = createPcodesFilter(filters);
        ZillowRentals.find(
            {postal_code: {$in: filter}}, function(err, rentals) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            console.log("Rentals filters sent");
            res.json(rentals);
        });
    }
});

router.route('/forsale')
.get(function(req, res) {
    console.log(ZillowSale);
    ZillowSale.find(function(err, forsale) {
        if (err) {
            console.log(err);
            res.send(err);
        }
        
        console.log("Forsale:");
        res.json(forsale);
    });
});

router.route('/forsale/:filters')
.get(function(req, res) {
    let filters = req.params.filters;
    console.log("Forsale filters:", filters);

    [pstam, parr] = filters.split('=');
    let argpcodes = parr
    if(parr.includes('&')) {
        parr = parr.split('&');
        parr = parr.map(element => parseInt(element));
        argpcodes = parr.join(' ');
    }

    console.log(argpcodes);
    const { stdout, stderr, code } = shell.exec('/home/oleg/projects/Python/zillow_1/python-zillow/run_zillow_scraps.sh ' + argpcodes);
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
    console.log("code:", code);

    if (filters.includes('p=') && filters.includes('b=')) {
        const filter = createBListAndPCodesFilter(filters);
        ZillowSale.find(
            { $and: filter}, function(err, sales) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            console.log("Sales filters sent");
            res.json(sales);
        });
    } else if (!filters.includes('p=')) {
        const filter = createBListFilter(filters); 
        ZillowSale.find(
            { $and: filter}, function(err, sales) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            console.log("Sales filters sent");
            res.json(sales);
        });
    } else if (!filters.includes('b=')) {
        const filter = createPcodesFilter(filters);
        ZillowSale.find(
            {postal_code: {$in: filter}}, function(err, sales) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            console.log("Sales filters sent");
            res.json(sales);
        });
    }
});

module.exports = router;