// Asterothoria Belt
// Starshatter Rift
// Celestial Labyrinth
// Solaris Spires
// Meteorium Maze


document.addEventListener("keydown", event => {
    if (gameLoaded) {
        if (event.key.toLowerCase() == "r") {
            customConfirm("Are you sure you want to reset, this is not able to be undone? ", () => {
                reset()
            })
        }  
        if (!asteroidsVisible()){ 
    
            var p = q.planets[planet]
            var pc = capitalizeFirstLetter(p)
    
    
            if (event.key.toLowerCase() == 1 && !event.ctrlKey && !event.altKey) {
                document.querySelector(`.${p}UpgradeButton`).click()
            } 
            
            else if (event.key.toLowerCase() == 2 && !event.ctrlKey && !event.altKey) {
                if (q[p].prestige.amount >= 1) {
                    document.querySelector(`.${p}PrestigeUpgradesButton`).click()
                }
            } 
            
            else if (event.key.toLowerCase() == 3 && !event.ctrlKey && !event.altKey) {
                if (q.ascend.amount >= 1) {
                    document.querySelector(`.${p}AscentionUpgradesButton`).click()
                }
            } 
            
            
            else if (event.key.toLowerCase() == "q") {
                upgrade(p)
            } 
            
            else if (event.key.toLowerCase() == "a") {
                autoUpgrade(p)
            } 
            else if (event.key.toLowerCase() == "s") {
                autoPrintMoney(p)
            } 
            else if (event.key.toLowerCase() == "d") {
                autoPlay()
            } 
            
            else if (event.key.toLowerCase() == "z") {
                hire("builder",p)
            }
            else if (event.key.toLowerCase() == "x") {
                hire("manager",p)
            }
            else if (event.key.toLowerCase() == "c") {
                hire("superManager",p)
            }
            else if (event.key.toLowerCase() == "v") {
                hire("engineer",p)
            }
    
            else if (event.key.toLowerCase() == "p") {
                prestige(p)
            }
            
            else if (event.key.toLowerCase() == "o") {
                if (q.mars.purchased) {
                    ascend()
                }
            }
    
            else if (event.key.toLowerCase() == "arrowup") {
                var thing = menuOpened.split(`.${p}`)[1]
    
                if (thing != undefined) {
                    thing = p + thing.replaceAll("Upgrades","Page")
    
                    pages[thing] += 1
                }
            }
    
            else if (event.key.toLowerCase() == "arrowdown") {
                var thing = menuOpened.split(`.${p}`)[1]
    
                if (thing != undefined) {
                    thing = p + thing.replaceAll("Upgrades","Page")
    
                    pages[thing] -= 1
    
                    if (pages[thing] == 0) {
                        pages[thing] = 1
                    }
                }
            }
            //Factory hotkeyss
    
            var key = event.key
    
            if (key == "0") {
                key = "10"
            }
    
    
            if (q[p][`${p}_mk`+parseInt(key)] != undefined  && event.ctrlKey && event.altKey) {
                levelUp(`${p}_mk`+parseInt(key),p)
            }
    
            else if (q[p][`${p}_mk`+parseInt(key)] != undefined  && event.altKey) {
                hire(`${p}_mk`+parseInt(key),p)
            }
        }
    }
})

function setIntervul(callback, timeout,key) {
    setInterval(() => {
        if (gameLoaded) {
            callback()
        }
    }, timeout);
}

class AsteroidBelt {
    constructor(name, cost) {
        q.asteroidBelts.push(name)
        q[name+"Ores"] = []
        q.asteroid.asteroidBelts[name] = {
            cost: cost,
            purchased: false
        }

        const asteroidBektButton = `
            <button class="upgradeButton ${name+"automate"+ capitalizeFirstLetter(name)+"Buy"}" onclick="automateAsteroidOre('${name}','${name}')">${"Fly to "+ capitalizeFirstLetter(name)}</button>
        `
        document.querySelector(".asteroidBeltssubmenus").innerHTML += asteroidBektButton
        

    }
}

function buyAsteroidBelt(name) {
    console.log(name)
}

class Asteroid {
    constructor(name, belt) {
        q.asteroids.push(name)
        q.asteroid.asteroids[name] = {}

        for (var asteroidOre of q[belt+"Ores"]) {
            q.asteroid.asteroids[name][asteroidOre] = JSON.parse(JSON.stringify(q.asteroid[asteroidOre]))
        }

        loadAsteroidHtml(name)

    }
}

class Planet {
    constructor(name) {
        q.planets.push(name)
        q[name] = {
            factories: [],
            purchased: false,
            costP: 1000,
            cost: 1000000000000,
            money: 0,
            click: {
                amount: 1,
                cost: 1500,
            },
            money: 0,
    
            colonists: {
                amount: 0,
                cost: 10000,
            },
            builder: {
                amount: 0,
                cost: 100000,
            },
            engineer: {
                amount: 0,
                cost: 150000,
            },
            manager: {
                amount: 0,
                cost: 2500000,
            },
            superManager: {
                amount: 0,
                cost: 100000000,
            },
    
    
            food: 0,
            water: 0,
            energy: 0,
            populationCapacity: 0,
            population: 0,
            Econsumption: 0,

            waterProduction: 0,
            foodProduction: 0,
    
            moneyPerSecond: 0,
    
            factories: [],
            farms: [],
            waterMakers: [],
            reactors: [],
            habs: [],
            things: [],
    
            autoPrint: {
                on: false,
                cost: 325000,
            },
            autoUpgrade: {
                on: false,
                cost: 25000,
            },
    
            prestige: {
                amount: 0,
                cost: 25000000000000000,
                prestigeTokens: 0,
                multiplier: {
                    amount: 1,
                    cost: 1,
                    max: 99999999999999999999999,
                    add: 5,
                    level: 0,
                },
                tokensAdd: {
                    amount: 1,
                    cost: 1,
                    max: 99999999999999999999999,
                    add: 1,
                    level: 0,
                },
                nuclearPower: {
                    amount: 1000,
                    cost: 1,
                    max: 19,
                    add: -50,
                    level: 0,
                },
                taxCuts: {
                    amount: 0,
                    cost: 1,
                    max: 19,
                    add: 5,
                    level: 0,
                },
                BOGOF: {
                    amount: 0,
                    cost: 1,
                    max: 5,
                    add: 1,
                    level: 0,
                },
    
                wizzard: {
                    amount: 0,
                    cost: 10000,
                },
                artist: {
                    amount: 0,
                    cost: 10,
                },
                hackerman: {
                    amount: 0,
                    cost: 1000,
                },
                nasaEngineer: {
                    amount: 0,
                    cost: 100,
                },
                buisnessManager: {
                    amount: 0,
                    cost: 5000,
                },
            },
        }

    intervals[`.${name}GiveMoney`] = setIntervul(function () {
        for (var i = 0;i < q.ascend[name].atomicPower.amount;i++){
            q[name].money += q[name].moneyPerSecond * q[name].prestige.multiplier.amount * q.ascend[name].multiplier.amount
        }
    }, q[name].prestige.nuclearPower.amount)

    pages[name+"Page"] = 1
    pages[name+"AscentionPage"] = 1


    }
}


class AsteroidOre {
    constructor(name, value, researchRequired, belt) {
        q[belt+"Ores"].push(name)
        q.asteroidOres.push(name)

        q.asteroid[name] = {
            value: value,
            originalValue: value,
            cost: value * 25,
            originalCost: value*25,
            unlocked: false,
            clicked: false,
            progress: 0,
            time: 5000,
            timePassed: 0,
            time_reduce: 100,
            auto: false,
            researchRequired: researchRequired,
            level: 1,   
            multiplier: 1,
            upgrades: {},
        }
    }
}

class AsteroidOreUpgrade {
    constructor(name, multiplier, costMultiplier){
        for (var ore of q.asteroidOres) {
            q.asteroid[ore].upgrades[name] = {
                cost: q.asteroid[ore].cost*costMultiplier,
                multiplier: multiplier,
                purchased: false
            }
        }

        q.asteroidOreUpgrades.push(name)
    }
}

var q = {

    asteroid: {
        belt: "Asterothoria Belt",
        money: 0,
        trackerBeam: {
            cost: 100000,
            purchased: false,
        },
        asteroidBelts: {},
        asteroids: {},
        maxAsteroids: 1,
        asteroidsMining: 0,
        research: 0,
    },

    ascend: {
        cost: 10000000000000000000000,
        costP: 10000,
        tokens: 0,
        amount: 0,


        earth: {
            Enchanter: {
                cost: 1000000,
                amount: 0,
            },
            shadowHacker: {
                cost: 10000,
                amount: 0,
            },
            technomancer: {
                cost: 1000,
                amount: 0,
            },
            arcaneScholar: {
                cost: 100,
                amount: 0,
            },
            roguewizzard : {
                cost: 100000,
                amount: 0,
            },

            multiplier: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 500,
                level: 0,
            },
            autoPrintStack: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 1,
                level: 0,
            },
            autoUpgradeStack: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 1,
                level: 0,
            },
            //its just increased how many times per print
            atomicPower: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 1,
                level: 0,
            },
            taxCuts: {
                amount: 0,
                cost: 1,
                max: 30,
                add: 3,
                level: 0,
            },
            BOGOF: {
                amount: 0,
                cost: 1,
                max: 5,
                add: 5,
                level: 0,
            },
        },
        moon: {
            Enchanter: {
                cost: 1000000,
                amount: 0,
            },
            shadowHacker: {
                cost: 10000,
                amount: 0,
            },
            technomancer: {
                cost: 1000,
                amount: 0,
            },
            arcaneScholar: {
                cost: 100,
                amount: 0,
            },
            roguewizzard : {
                cost: 100000,
                amount: 0,
            },

            multiplier: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 500,
                level: 0,
            },
            autoPrintStack: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 1,
                level: 0,
            },
            autoUpgradeStack: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 1,
                level: 0,
            },
            //its just increased how many times per print
            atomicPower: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 1,
                level: 0,
            },
            taxCuts: {
                amount: 0,
                cost: 1,
                max: 30,
                add: 3,
                level: 0,
            },
            BOGOF: {
                amount: 0,
                cost: 1,
                max: 5,
                add: 5,
                level: 0,
            },
        },
        mars: {
            Enchanter: {
                cost: 1000000,
                amount: 0,
            },
            shadowHacker: {
                cost: 10000,
                amount: 0,
            },
            technomancer: {
                cost: 1000,
                amount: 0,
            },
            arcaneScholar: {
                cost: 100,
                amount: 0,
            },
            roguewizzard : {
                cost: 100000,
                amount: 0,
            },

            multiplier: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 500,
                level: 0,
            },
            autoPrintStack: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 1,
                level: 0,
            },
            autoUpgradeStack: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 1,
                level: 0,
            },
            //its just increased how many times per print
            atomicPower: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 1,
                level: 0,
            },
            taxCuts: {
                amount: 0,
                cost: 1,
                max: 30,
                add: 3,
                level: 0,
            },
            BOGOF: {
                amount: 0,
                cost: 1,
                max: 5,
                add: 5,
                level: 0,
            },
        },
    },
    
    earth: {
        factories: [],
        money: 0,
        moneyPerSecond: 0,
        click: {
            amount: 1,
            cost: 1000
        },

        builder: {
            amount: 0,
            cost: 50000
        },
        engineer: {
            amount: 0,
            cost: 1000000
        },
        manager: {
            amount: 0,
            cost: 25000000
        },
        superManager: {
            amount: 0,
            cost: 150000000
        },

        autoPrint: {
            on: false,
            cost: 100000,
        },
        autoUpgrade: {
            on: false,
            cost: 10000,
        },
        autoPlay: {
            on: false,
            cost: 500000000,
        },

        prestige: {
            amount: 0,
            cost: 10000000000000000,
            prestigeTokens: 0,
            multiplier: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 5,
                level: 0,
            },
            tokensAdd: {
                amount: 1,
                cost: 1,
                max: 99999999999999999999999,
                add: 1,
                level: 0,
            },
            nuclearPower: {
                amount: 1000,
                cost: 1,
                max: 19,
                add: -50,
                level: 0,
            },
            taxCuts: {
                amount: 0,
                cost: 1,
                max: 19,
                add: 5,
                level: 0,
            },
            BOGOF: {
                amount: 0,
                cost: 1,
                max: 5,
                add: 1,
                level: 0,
            },

            wizzard: {
                amount: 0,
                cost: 10000,
            },
            artist: {
                amount: 0,
                cost: 10,
            },
            hackerman: {
                amount: 0,
                cost: 1000,
            },
            nasaEngineer: {
                amount: 0,
                cost: 100,
            },
            buisnessManager: {
                amount: 0,
                cost: 5000,
            },
        },
    },

    easy: 1,
    medium: 5,
    hard: 25,
    insane: 100,
    impossible: 500,

    lastPlayed: NaN,
    planets: ["earth"],
    asteroids: [],
    asteroidOres: [],
    asteroidOreUpgrades: [],
    asteroidBelts: [],

}

var intervals = {
    earthAutoPrintInterval: null,
    earthAutoPrintInterval: null,
    
    earthGiveMoney: null,
}


var timeouts = {

}

var pages = {
    earthPage: 1,
    earthAscentionPage: 1,
}

class factory {
    constructor(name, earn,planet,page="page1") {
        this.name = name
        this.earn = earn
        this.cost = earn * 25
        this.planet = planet

        this.page = page
        q[this.planet].factories.push(this.name)
        q[this.planet][this.name] = {
            amount: 0,
            cost: this.cost,
            level: 0,
            earn: this.earn,
        }

        var finalString = capitalizeFirstLetter(name)

        var factoryHTML = document.createElement("div")
        factoryHTML.className = this.name
        factoryHTML.innerHTML = `
            <button class="upgrade${finalString}" title="Upgrades this factory">&uarr;</button>
            <button class="build${finalString}">Build</button>
            <label class="${this.name}Display"></label>
        `

        document.querySelector(`.${this.planet}${this.page}factories`).appendChild(factoryHTML)

        document.querySelector(`.upgrade${finalString}`).onclick =  () => {levelUp(name,planet)}
        document.querySelector(`.build${capitalizeFirstLetter(name)}`).onclick =  () => {hire(name,planet)}
    }
}

class hab {
    constructor(name, cost, pop, planet,page,energy){
        this.name = name
        this.cost = cost
        this.planet = planet
        this.page = page
        this.energy = energy
        q[planet][name] = {
            amount: 0,
            cost: cost,
            population: pop,
            Econsumption: energy
        }

        var capital = String(String(this.name).split("")[0].toUpperCase())
        var arr = String(this.name).split("")
        arr.shift()
        var other = String(arr).replaceAll(",", "")
        var finalString = capital + other


        q[planet].habs.push(this.name)
        q[planet].things.push(this.name)

        var factoryHTML = document.createElement("div")
        factoryHTML.className = this.name
        factoryHTML.innerHTML = `
            <button class="build${finalString}">Build</button>
            <label class="${this.name}Display">Lorem ipsum</label>
        `
        document.querySelector(`.${this.planet}${this.page}habitats`).appendChild(factoryHTML)
        document.querySelector(`.build${finalString}`).onclick =  ()  => { hire(this.name,this.planet) }
    }
}

class farm {
    constructor(name, cost, produce, energy,planet,page){
        this.name = name
        this.cost = cost
        this.planet = planet
        this.page = page
        this.produce = produce
        this.energy = energy

        q[planet][name] = {
            amount: 0,
            cost: cost,
            produce: produce,
            Econsumption: energy,
        }

        var capital = String(String(this.name).split("")[0].toUpperCase())
        var arr = String(this.name).split("")
        arr.shift()
        var other = String(arr).replaceAll(",", "")
        var finalString = capital + other


        q[planet].farms.push(this.name)
        q[planet].things.push(this.name)

        var factoryHTML = document.createElement("div")
        factoryHTML.className = this.name
        factoryHTML.innerHTML = `
            <button class="build${finalString}">Build</button>
            <label class="${this.name}Display">Lorem ipsum</label>
        `
        document.querySelector(`.${this.planet}${this.page}farms`).appendChild(factoryHTML)
        document.querySelector(`.build${finalString}`).onclick =  ()  => { hire(this.name,this.planet) }
    }
}

class waterMaker {
    constructor(name, cost, produce, energy,planet,page){
        this.name = name
        this.cost = cost
        this.planet = planet
        this.page = page
        this.produce = produce
        this.energy = energy

        q[planet][name] = {
            amount: 0,
            cost: cost,
            produce: produce,
            Econsumption: energy,
        }

        var capital = String(String(this.name).split("")[0].toUpperCase())
        var arr = String(this.name).split("")
        arr.shift()
        var other = String(arr).replaceAll(",", "")
        var finalString = capital + other


        q[planet].waterMakers.push(this.name)
        q[planet].things.push(this.name)

        var factoryHTML = document.createElement("div")
        factoryHTML.className = this.name
        factoryHTML.innerHTML = `
            <button class="build${finalString}">Build</button>
            <label class="${this.name}Display">Lorem ipsum</label>
        `
        document.querySelector(`.${this.planet}${this.page}watermakers`).appendChild(factoryHTML)
        document.querySelector(`.build${finalString}`).onclick =  ()  => {hire(this.name,this.planet) }
    }
}

class reactor {
    constructor(name, cost, produce, planet,page){
        this.name = name
        this.cost = cost
        this.planet = planet
        this.page = page
        this.produce = produce

        q[planet][name] = {
            amount: 0,
            cost: cost,
            produce: produce,
        }

        var capital = String(String(this.name).split("")[0].toUpperCase())
        var arr = String(this.name).split("")
        arr.shift()
        var other = String(arr).replaceAll(",", "")
        var finalString = capital + other


        q[planet].reactors.push(this.name)

        var factoryHTML = document.createElement("div")
        factoryHTML.className = this.name
        factoryHTML.innerHTML = `
            <button class="build${finalString}">Build</button>
            <label class="${this.name}Display">Lorem ipsum</label>
        `
        document.querySelector(`.${this.planet}${this.page}reactors`).appendChild(factoryHTML)
        document.querySelector(`.build${finalString}`).onclick =  ()  => { hire(this.name,this.planet)  }
    }
}


var difficulties = ["easy", "medium", "hard", "insane","impossible"]
var difficulty = ""

var moon = new Planet("moon")
var mars = new Planet("mars")

var thousand = 1000;
var million = thousand * 1000;
var billion = million * 1000;
var trillion = billion * 1000;
var quadrillion = trillion * 1000;
var quintillion = quadrillion * 1000;
var sextillion = quintillion * 1000;
var septillion = sextillion * 1000;
var octillion = septillion * 1000;
var nonillion = octillion * 1000;
var decillion = nonillion * 1000;
var undecillion = decillion * thousand;
var duodecillion = undecillion * thousand;
var tredecillion = duodecillion * thousand;
var quattuordecillion = tredecillion * thousand;
var quindecillion = quattuordecillion * thousand;
var sexdecillion = quindecillion * thousand;
var septendecillion = sexdecillion * thousand;
var octodecillion = septendecillion * thousand;
var novemdecillion = octodecillion * thousand;
var vigintillion = novemdecillion * thousand;
var unvigintillion = vigintillion * thousand;
var duovigintillion = unvigintillion * thousand;
var trevigintillion = duovigintillion * thousand;
var quattuorvigintillion = trevigintillion * thousand;
var quinvigintillion = quattuorvigintillion * thousand;
var sexvigintillion = quinvigintillion * thousand;
var septenvigintillion = sexvigintillion * thousand;
var octovigintillion = septenvigintillion * thousand;
var novemvigintillion = octovigintillion * thousand;
var trigintillion = novemvigintillion * thousand;
var untrigintillion = trigintillion * thousand;
var duotrigintillion = untrigintillion * thousand;
var duotrigintillion = untrigintillion * thousand;
var tretrigintillion = duotrigintillion * thousand;
var quattuortrigintillion = tretrigintillion * thousand;
var quintrigintillion = quattuortrigintillion * thousand;
var sextrigintillion = quintrigintillion * thousand;
var septentrigintillion = sextrigintillion * thousand;
var octotrigintillion = septentrigintillion * thousand;
var noventrigintillion = octotrigintillion * thousand;
var quadragintillion = noventrigintillion * thousand;
var unquadragintillion = quadragintillion * thousand;
var duoquadragintillion = unquadragintillion * thousand;
var trequadragintillion = duoquadragintillion * thousand;
var quattuorquadragintillion = trequadragintillion * thousand;
var quinquadragintillion = quattuorquadragintillion * thousand;
var sexquadragintillion = quinquadragintillion * thousand;
var septenquadragintillion = sexquadragintillion * thousand;
var octoquadragintillion = septenquadragintillion * thousand;
var novenquadragintillion = octoquadragintillion * thousand;
var quinquagintillion = novenquadragintillion * thousand;
var unquinquagintillion = quinquagintillion * thousand;
var duoquinquagintillion = unquinquagintillion * thousand;
var trequinquagintillion = duoquinquagintillion * thousand;
var quattuorquinquagintillion = trequinquagintillion * thousand;
var quinquinquagintillion = quattuorquinquagintillion * thousand;
var sexquinquagintillion = quinquinquagintillion * thousand;
var septenquinquagintillion = sexquinquagintillion * thousand;
var octoquinquagintillion = septenquinquagintillion * thousand;
var novenquinquagintillion = octoquinquagintillion * thousand;
var sexagintillion = novenquinquagintillion * thousand;


q.mars.click.cost = 2500
q.mars.autoPrint.cost = 525000
q.mars.autoUpgrade.cost = 37500

new factory("earth_mk1", 50000,"earth") 
new factory("earth_mk2", 7500000,"earth")
new factory("earth_mk3", 50000000,"earth") 
new factory("earth_mk4", 7500000000,"earth") 
new factory("earth_mk5", 50000000000,"earth") 
new factory("earth_mk6",1500000000000,"earth","page2")
new factory("earth_mk7", 270000000000000,"earth", "page2")
new factory("earth_mk8", 1500000000000000,"earth", "page2")
new factory("earth_mk9", 27000000000000000,"earth", "page2")
new factory("earth_mk10", 1500000000000000000,"earth", "page2")

new hab(`moon_hab_mk1`, 10000,100,"moon",`page2`,1)
new hab(`moon_hab_mk2`, 100000,500,"moon",`page2`,50)
new hab(`moon_hab_mk3`, 2500000,1000,"moon",`page2`,250)
new hab(`moon_hab_mk4`, 50000000,2500,"moon",`page2`,5000)
new hab(`moon_hab_mk5`, 1000000000,10000,"moon",`page2`,100000)

new farm(`moon_farm_mk1`,10000,5,1,"moon",`page3`)
new farm(`moon_farm_mk2`,100000,100,50,"moon",`page3`)
new farm(`moon_farm_mk3`,2500000,2500,250,"moon",`page3`)
new farm(`moon_farm_mk4`,50000000,10000,5000,"moon",`page3`)
new farm(`moon_farm_mk5`,1000000000,50000,25000,"moon",`page3`)

new waterMaker(`moon_watermaker_mk1`,10000,5,1,"moon",`page3`)
new waterMaker(`moon_watermaker_mk2`,100000,100,50,"moon",`page3`)
new waterMaker(`moon_watermaker_mk3`,2500000,2500,250,"moon",`page3`)  
new waterMaker(`moon_watermaker_mk4`,50000000,10000,5000,"moon",`page3`)
new waterMaker(`moon_watermaker_mk5`,1000000000,50000,25000,"moon",`page3`)

new reactor(`moon_reactor_mk1`,1000,5,"moon",`page2`)
new reactor(`moon_reactor_mk2`,10000,250,"moon",`page2`)
new reactor(`moon_reactor_mk3`,250000,1500,"moon",`page2`)
new reactor(`moon_reactor_mk4`,5100000,50000,"moon",`page2`)
new reactor(`moon_reactor_mk5`,150000000,175000,"moon",`page2`)

new factory(`moon_mk1`,100000,"moon",`page4`)
new factory(`moon_mk2`,7500000,"moon",`page4`)
new factory(`moon_mk3`,50000000,"moon",`page4`)
new factory(`moon_mk4`,7500000000,"moon",`page4`)
new factory(`moon_mk5`,50000000000,"moon",`page4`)
new factory(`moon_mk6`,1500000000000,"moon",`page4`)
new factory(`moon_mk7`,270000000000000,"moon",`page4`)
new factory(`moon_mk8`,1500000000000000,"moon",`page4`)
new factory(`moon_mk9`,27000000000000000,"moon",`page4`)
new factory(`moon_mk10`,1500000000000000000,"moon",`page4`)

new hab(`mars_hab_mk1`, 10000,100,"mars",`page2`,1)
new hab(`mars_hab_mk2`, 100000,500,"mars",`page2`,50)
new hab(`mars_hab_mk3`, 2500000,1000,"mars",`page2`,250)
new hab(`mars_hab_mk4`, 50000000,2500,"mars",`page2`,5000)
new hab(`mars_hab_mk5`, 1000000000,10000,"mars",`page2`,100000)

new farm(`mars_farm_mk1`,10000,5,1,"mars",`page3`)
new farm(`mars_farm_mk2`,100000,100,50,"mars",`page3`)
new farm(`mars_farm_mk3`,2500000,2500,250,"mars",`page3`)
new farm(`mars_farm_mk4`,50000000,10000,5000,"mars",`page3`)
new farm(`mars_farm_mk5`,1000000000,50000,25000,"mars",`page3`)

new waterMaker(`mars_watermaker_mk1`,10000,5,1,"mars",`page3`)
new waterMaker(`mars_watermaker_mk2`,100000,100,50,"mars",`page3`)
new waterMaker(`mars_watermaker_mk3`,2500000,2500,250,"mars",`page3`)  
new waterMaker(`mars_watermaker_mk4`,50000000,10000,5000,"mars",`page3`)
new waterMaker(`mars_watermaker_mk5`,1000000000,50000,25000,"mars",`page3`)

new reactor(`mars_reactor_mk1`,1000,5,"mars",`page2`)
new reactor(`mars_reactor_mk2`,10000,250,"mars",`page2`)
new reactor(`mars_reactor_mk3`,250000,1500,"mars",`page2`)
new reactor(`mars_reactor_mk4`,5100000,50000,"mars",`page2`)
new reactor(`mars_reactor_mk5`,150000000,175000,"mars",`page2`)

new factory(`mars_mk1`,100000,"mars",`page4`)
new factory(`mars_mk2`,7500000,"mars",`page4`)
new factory(`mars_mk3`,50000000,"mars",`page4`)
new factory(`mars_mk4`,7500000000,"mars",`page4`)
new factory(`mars_mk5`,50000000000,"mars",`page4`)
new factory(`mars_mk6`,1500000000000,"mars",`page4`)
new factory(`mars_mk7`,270000000000000,"mars",`page4`)
new factory(`mars_mk8`,1500000000000000,"mars",`page4`)
new factory(`mars_mk9`,27000000000000000,"mars",`page4`)
new factory(`mars_mk10`,1500000000000000000,"mars",`page4`)

new AsteroidBelt("Asterothoria Belt",50)
new AsteroidBelt("Meteorium Maze",50)
new AsteroidBelt("Solaris Spires",50)
new AsteroidBelt("Celestial Labyrinth",50)
new AsteroidBelt("Starshatter Rift",50)

new AsteroidOre("Stone",1,0,"Asterothoria Belt")
new AsteroidOre("Copper",100,100,"Asterothoria Belt")
new AsteroidOre("Iron",1000,500,"Asterothoria Belt")
new AsteroidOre("Silver",5500,1000,"Asterothoria Belt")
new AsteroidOre("Steel",10000,2000,"Asterothoria Belt")
new AsteroidOre("Gold",1000000,3750,"Asterothoria Belt")
new AsteroidOre("Topaz",10000000,5000,"Asterothoria Belt")
new AsteroidOre("Amethyst",100000000,10000,"Asterothoria Belt")
new AsteroidOre("Ruby",1000000000,15000,"Asterothoria Belt")
new AsteroidOre("Sapphire",10000000000,20000,"Asterothoria Belt")
new AsteroidOre("Emerald",100000000000, 25000,"Asterothoria Belt")
new AsteroidOre("Pyrite",1000000000000, 30000,"Asterothoria Belt")
new AsteroidOre("Zircon",10000000000000, 35000,"Asterothoria Belt")
new AsteroidOre("Kyanite",100000000000000,40000,"Asterothoria Belt")
new AsteroidOre("Garnet",1000000000000000, 45000,"Asterothoria Belt")
new AsteroidOre("Jade",10000000000000000, 50000,"Asterothoria Belt")
new AsteroidOre("Beryl",100000000000000000, 75000,"Asterothoria Belt")
new AsteroidOre("Citrine",1000000000000000000,100000,"Asterothoria Belt")
new AsteroidOre("Fluorite",10000000000000000000,125000,"Asterothoria Belt")
new AsteroidOre("Hyacinth",100000000000000000000,150000,"Asterothoria Belt")
new AsteroidOre("Lolite",1000000000000000000000,200000,"Asterothoria Belt")
new AsteroidOre("Labradorite",10000000000000000000000, 250000,"Asterothoria Belt")
new AsteroidOre("Malachite",100000000000000000000000, 275000,"Asterothoria Belt")
new AsteroidOre("Quartz",1000000000000000000000000, 300000,"Asterothoria Belt")
new AsteroidOre("Obsidian",10000000000000000000000000, 325000,"Asterothoria Belt")

q.asteroid.Stone.unlocked = true

new AsteroidOreUpgrade("1.5",1.5,12)
new AsteroidOreUpgrade("2",2,25)
new AsteroidOreUpgrade("2.5",2.5,25)
new AsteroidOreUpgrade("3",3,50)
new AsteroidOreUpgrade("3.5",3.5,100)
new AsteroidOreUpgrade("4",4,25)
new AsteroidOreUpgrade("4.5",4.5,125)
new AsteroidOreUpgrade("5",5,25)
new AsteroidOreUpgrade("5.5",5.5,150)
new AsteroidOreUpgrade("6",6,25)
new AsteroidOreUpgrade("6.5",6.5,225)
new AsteroidOreUpgrade("7",7,25)
new AsteroidOreUpgrade("7.5",7.5,250)
new AsteroidOreUpgrade("8",8,25)
new AsteroidOreUpgrade("8.5",8.5,275)
new AsteroidOreUpgrade("9",9,25)
new AsteroidOreUpgrade("9.5",9.5,300)
new AsteroidOreUpgrade("10",10,325)

var br = document.createElement("br")
document.querySelector(".earthpage2factories").appendChild(br)

const stock = JSON.parse(JSON.stringify(q))

var planet = 0
var asteroid = 1

var gameLoaded = false
var setDifficultyPageLoaded = false
var startScreenLoaded = true
var menuOpen = false
var ascentionAlerted = false
var menuOpened = ""

/*Function*/ {

function giveMoney(planet) {
    q[planet].money += q[planet].click.amount * q[planet].prestige.multiplier.amount * q.ascend[planet].multiplier.amount;

    var label = document.createElement("label")
    label.className = "moneyPopup"
    label.innerHTML = `+ $${num2txt(q[planet].click.amount * q[planet].prestige.multiplier.amount * q.ascend[planet].multiplier.amount)}`

    document.querySelector("body").appendChild(label)

    var x = Math.floor(Math.random() * window.innerWidth)
    var y = Math.floor(Math.random() * window.innerHeight) + 50 

    label.style.position = "absolute"
    label.style.left = x + "px"
    label.style.top = y + "px"



    setTimeout(function(){document.querySelector("body").removeChild(label)},5000)
}

function upgrade(p="earth",alert=true) {
    if (q[p].money >= q[p].click.cost) {
        q[p].money -= q[p].click.cost
        q[p].click.amount += 1;
    }
    else {
        if (alert){
            customAlert(`You need ${num2txt(q[p].click.cost - q[p].money)} more money to do this! `)
        }
    }
}

function start() {
    customConfirm("Are you Sure? ",() => {
        $(".start").fadeOut(800,function() {
            document.querySelector(".difficulty").style.visibility = "visible"
            setDifficultyPageLoaded = true
            startScreenLoaded = false
        })
    })    
}

function setDifficulty(difficult,ask=false) {
    function doIt() {
        if (document.querySelector(".start") != undefined) {
            $(".difficulty").fadeOut(1000,function() {
                document.querySelector("body").removeChild(document.querySelector(".start"))
                document.querySelector("body").removeChild(document.querySelector(".difficulty"))
                document.querySelector(".game").style.visibility = "visible"
                document.querySelector("body").style.backgroundColor = "white"
                gameLoaded = true
                setDifficultyPageLoaded = false
            })
        }

        difficulty = difficult
        startGame()
    }


    if (ask) {
        customConfirm(`Are you sure you want to continue with ${difficult} mode????`,() => {
            doIt()
        })
    }
    else {
        doIt()
    }
}

var earthAutoUpgradeInterval = null
var earthAutoPrintInterval = null

function autoPlay() {
    if (q.earth.money < q.earth.autoPlay.cost) { customAlert(`You need $${num2txt(q.earth.autoPlay.cost - q.earth.money)} more to do this.`); return false }
    if (q.earth.autoPlay.has) { return false }
    q.earth.money -= q.earth.autoPlay.cost
    customAlert("Get trolled bozo")
}

function update() {
    if (gameLoaded) {
        updateStats()
        displayStats()
        updatePlanets()
        updatePageForAllPlanets()
        hideUpgradeButtons()
        updatePlanet()
        updateAscentionPageForAllPlanets()
        updateScreen()
        updateAsteroid()
    }


}

function loadAsteroidHtml(name) {
    var div = document.createElement("div")
    div.className = name
    div.classList.add("asteroid")

    document.querySelector(".asteroids > .asteroids").appendChild(div)

    var automations = `<div class="submenu ${name+"submenu"}"></div>`

    document.querySelector(".automationsubmenus").innerHTML += automations
    document.querySelector(".upgradessubmenus").innerHTML += automations
    document.querySelector(".oreResearchsubmenus").innerHTML += automations
    document.querySelector(".moreResearchsubmenus").innerHTML += automations
    

    for (var n of q.asteroidOres) {
        q.asteroid.asteroids[name][n].clicked = false

        var set = document.createElement("div")
        set.id = name + "_"+ n + "_set"
        set.className = "set"
        set.innerHTML = `
        <div class="asteroid_set_container">
        <button class="give_money ${name}_${n}_give" onclick="click_asteroid('${name}','${n}')">${n}</button>
        &nbsp;
        &nbsp;
        &nbsp;
        <div class="progress ${name}_${n}_progress">
            <div class="progress_fill ${name}_${n}_fill"></div>
                <label class="click_display ${name}_${n}_click">$12</label>
        </div></div><br><br><br><br>
        `

        div.appendChild(set)

        const automationButtonHtml = `
            <button class="upgradeButton ${name+"automate"+ capitalizeFirstLetter(n)+"Buy"}" onclick="automateAsteroidOre('${name}','${n}')">${"Automate "+ capitalizeFirstLetter(n)}</button>
        `
        document.querySelector(".automationsubmenus > ."+name+"submenu").innerHTML += automationButtonHtml
        

        const upgradeButtonHtml = `
            <button class="upgradeButton ${name+"upgrade"+ capitalizeFirstLetter(n)+"Buy"} " onclick="upgradeAsteroidOre('${name}','${n}')">${"Upgrade "+ capitalizeFirstLetter(n)        }</button>
        `

        document.querySelector(".upgradessubmenus > ."+name+"submenu").innerHTML += upgradeButtonHtml

        const oreResearchButtonHtml = `
        <button class="upgradeButton ${name}research${capitalizeFirstLetter(n)}Buy" onclick="researchAsteroidOre('${name}','${n}')">${"Research "+ capitalizeFirstLetter(n)}</button>
        `

        document.querySelector(".oreResearchsubmenus > ."+name+"submenu").innerHTML += oreResearchButtonHtml
    }


    for (var i = 2; i <= 100; i++){

        

        var button = `<button class="upgradeButton unlock_${i}_astroids" onclick="researchAsteroidAmount(${i})">Mine ${i} asteroids</button>`

        document.querySelector(".asteroidResearchsubmenus").innerHTML += button
    }

    for (var upgrade of q.asteroidOreUpgrades) {
        for (var ore of q.asteroidOres) {
            var button = `<button class="upgradeButton t${name}_${ore}_${md5(upgrade)}_buy" onclick="asteroidOreUpgrade('${upgrade}','${name}','${ore}')">${ore} - ${upgrade}X profits</button>`
            document.querySelector(".moreResearchsubmenus > ."+name+"submenu").innerHTML += button
        }
    }
}

function asteroidOreUpgrade(upgrade,asteroid_name, ore_name){
    var ore = q.asteroid.asteroids[asteroid_name][ore_name]
    var theUpgrade = ore.upgrades[upgrade]


    if (theUpgrade.purchased) {return}

    if (q.asteroid.money >= theUpgrade.cost) {
        q.asteroid.money -= theUpgrade.cost
        theUpgrade.purchased = true

        ore.multiplier *= theUpgrade.multiplier
        ore.value *= theUpgrade.multiplier
    }
    else {
        customAlert(`You need U$${num2txt(Math.floor(theUpgrade.cost - q.asteroid.money))} more to do this!`)
    }

}

function researchAsteroidAmount(number) {
    cost = 5000*(number-1)

    if (q.asteroid.research >= cost) {
        if (q.asteroid.maxAsteroids == number - 1){
            q.asteroid.research -= cost
            q.asteroid.maxAsteroids = number
        }
    }
    else {
        customAlert(`You need R$${num2txt(Math.floor(cost - q.asteroid.research))} more to do this!`)
    }
}

function researchAsteroidOre(asteroid_name, ore_name){
    var ore = q.asteroid.asteroids[asteroid_name][ore_name]

    if (ore.unlocked == true) {return}

    if (q.asteroid.research >= ore.researchRequired) {
        q.asteroid.research -= ore.researchRequired

        ore.unlocked = true
    }
    else {
        customAlert(`You need R$${num2txt(Math.floor(ore.researchRequired - q.asteroid.research))} more to do this!!!`)
    }
}

function upgradeAsteroidOre(asteroid_name, ore_name){
    var ore = q.asteroid.asteroids[asteroid_name][ore_name]
    if (q.asteroid.money >= ore.cost) {
        q.asteroid.money -= ore.cost

        ore.cost = Math.floor(ore.cost * 11)/10
        ore.level += 1
        ore.value += ore.originalValue * ore.multiplier
        ore.progress = 0

        if (ore.level < 50) {
            ore.time -= ore.time_reduce
        }
    }
    else {
        customAlert(`You need U$${num2txt(Math.floor(ore.cost - q.asteroid.money))} more to do this!`)
    }
}

function automateAsteroidOre(asteroid_name, ore_name) {
    var ore = q.asteroid.asteroids[asteroid_name][ore_name]

    if (ore.auto) {return false}
    

    if (q.asteroid.money >= ore.originalCost * 25) {
        ore.auto = true
        q.asteroid.money -= ore.originalCost * 25
    }
    else {
        customAlert(`You need U$${num2txt(Math.floor((ore.originalCost * 25) - q.asteroid.money))} more to do this!!`)
    }
}

function autoPrintMoney(planet) {
    function what() {
        clearTimeout(timeouts[`${planet}AutoPrint`])
        document.querySelector(`.${planet}AutoPrintMoneyBuy`).innerHTML = `buy`
        q[planet].autoPrint.on = false;
    }

    if (q[planet].autoPrint.on) {
        customConfirm(`Are you sure you want to stop this?`,() => {what()})
    }
    else {
        if (q[planet].money < q[planet].autoPrint.cost) {
            customAlert(`You need $${num2txt(q[planet].autoPrint.cost - q[planet].money)} more to do this.`)
            return false 
        }

        q[planet].money -= q[planet].autoPrint.cost
        document.querySelector(`.${planet}AutoPrintMoneyBuy`).innerHTML = `on`
        q[planet].autoPrint.on = true
        clearTimeout(timeouts[`${planet}AutoPrint`])



        timeouts[`${planet}AutoPrint`] = setTimeout(function () {
            what()
        }, 60000)
    }
}

function buyTrackerBeam() {
    if (q.asteroid.trackerBeam.purchased) {return false}

    if (q.ascend.tokens >= q.asteroid.trackerBeam.cost) {
        q.asteroid.trackerBeam.purchased = true
        q.ascend.tokens -= q.asteroid.trackerBeam.cost
    }
    else {
        customAlert(`You need A$${num2txt(q.asteroid.trackerBeam.cost - q.ascend.tokens)} more to do this!!!!`)
    }
}



function autoUpgrade(planet) {
    function what() {
        clearTimeout(timeouts[`${planet}Autoupgrade`])
        document.querySelector(`.${planet}AutoUpgradeBuy`).innerHTML = `buy`
        q[planet].autoUpgrade.on = false;
    }
    if (q[planet].autoUpgrade.on) {
        customConfirm(`Are you sure you want to stop this?`,() => {what()})
    }


    else{
        if (q[planet].money < q[planet].autoUpgrade.cost) { 
            customAlert(`You need $${num2txt(q[planet].autoUpgrade.cost - q[planet].money)} more to do this.`); 
            return false 
        }

        
        q[planet].money -= q[planet].autoUpgrade.cost
        document.querySelector(`.${planet}AutoUpgradeBuy`).innerHTML = `on`
        q[planet].autoUpgrade.on = true
        
        clearTimeout(timeouts[`${planet}Autoupgrade`])
        timeouts[`${planet}Autoupgrade`] = setTimeout(function () {
            what()
        }, 60000)
    }
}


function updateScreen() {
    if (asteroid >= 1) {
        document.querySelector(".planets").style.display = "none"
        document.querySelector(".asteroids").style.display = "block"
    }
    else {
        document.querySelector(".planets").style.display = "block"
        document.querySelector(".asteroids").style.display = "none"
    }
}




function updatePlanet() {
    try {
        var pl = q.planets[planet]
        if (document.querySelector(`.${pl}`) != undefined) {
            for (var p of q.planets) {
                document.querySelector(`.${p}`).style.display = "none"
            }
            document.querySelector(`.${pl}`).style.display = "block"
        }


        if (q.earth.prestige.amount >= 1) {
            document.querySelector(".changeWorldUp").style.display = "block"
            
            if (menuOpen) {
                document.querySelector(".changeWorldUp").style.display = "none"
                document.querySelector(".changeWorldDown").style.display = "none"
            }
            else {
                document.querySelector(".changeWorldUp").style.display = "block"

                //hide down button when on earth

                if (planet == 0) {
                    document.querySelector(".changeWorldDown").style.display = "none"
                }
                else {
                    document.querySelector(".changeWorldDown").style.display = "block"
                }

                //if we are on mars or prestige less than 1
                if (planet == 2 || q.earth.prestige.amount < 1) {
                    document.querySelector(".changeWorldUp").style.display = "none"
                }
                else {
                    document.querySelector(".changeWorldUp").style.display = "block"
                }
                
                if (planet == 1) {
                    if (q.moon.prestige.amount >= 1) {
                        document.querySelector(".changeWorldUp").style.display = "block"
                    }
                    else {
                        document.querySelector(".changeWorldUp").style.display = "none"
                    }
                }

            }
        }
        else {
            document.querySelector(".changeWorldUp").style.display = "none"
            document.querySelector(".changeWorldDown").style.display = "none"
        }

    }
    catch(err) {
        reset()
        console.log(err)
    }
}

function updateAsteroid() {


    var asteroid_name = q.asteroids[asteroid-1]
    var asteroid_name2 = q.asteroids[asteroid]

    if (q.asteroids.length == 0) {
        document.querySelector(".buttons2").style.display = "none"
    }
    else {
        document.querySelector(".buttons2").style.display = "block"
    }

    if (asteroid == 0) {return}    


    if (asteroid_name == undefined) {asteroid = q.asteroids.length;return}

    if (asteroid < 0) {
        asteroid = 0
    }

    for (var a of q.asteroids) {
        document.querySelector(`.${a}`).style.display = "none"
    }

    document.querySelector(`.${asteroid_name}`).style.display = "block"

    for (var a of q.asteroids) {
        const submenus = document.querySelectorAll(`.${a}submenu`);
        submenus.forEach(function(submenu){
            submenu.style.display = "none"
        })
    }

    const submenus = document.querySelectorAll(`.${q.asteroids[asteroid-1]}submenu`);
    submenus.forEach(function(submenu){
        submenu.style.display = "block"
    })
}

function hideUpgradeButtons() {
    try {

        for (var p of q.planets) {
            for (var i of q[p].factories) {
                var capital = String(String(i).split("")[0].toUpperCase())
                var arr = String(i).split("")
                arr.shift()
                var other = String(arr).replaceAll(",", "")
                var finalString = capital + other
                if (q[p][i].level >= 5) {
                    document.querySelector(`.upgrade${finalString}`).style.display = "none"
                }
                else {
                    document.querySelector(`.upgrade${finalString}`).style.display = ""
                }
    
                
            }



            if (q[p].prestige.taxCuts.level == q[p].prestige.taxCuts.max){
                document.querySelector(`.${p}BuyTaxCuts`).style.display = "none"
            }
            else {
                document.querySelector(`.${p}BuyTaxCuts`).style.display = ""
            }
            if (q[p].prestige.nuclearPower.level == q[p].prestige.nuclearPower.max){
                document.querySelector(`.${p}BuyNuclearFactories`).style.display = "none"
            }
            else {
                document.querySelector(`.${p}BuyNuclearFactories`).style.display = ""
            }
            if (q[p].prestige.BOGOF.level == q[p].prestige.BOGOF.max){
                document.querySelector(`.${p}BuyBuyOneGetOneFree`).style.display = "none"
            }
            else {
                document.querySelector(`.${p}BuyBuyOneGetOneFree`).style.display = ""
            }

            if (pages.marsPage == 5 && document.querySelector(".marsUpgrades").style.display == "block"){
                document.querySelector(`.changeWorldDown`).style.visibility = "hidden"
            }
            else {
                document.querySelector(`.changeWorldDown`).style.visibility = ""
            }

            if (q.ascend[p].taxCuts.level == q.ascend[p].taxCuts.max){
                document.querySelector(`.earth${capitalizeFirstLetter(p)}AscentionTaxCutsBuy`).style.display = "none"
                document.querySelector(`.moon${capitalizeFirstLetter(p)}AscentionTaxCutsBuy`).style.display = "none"
                document.querySelector(`.mars${capitalizeFirstLetter(p)}AscentionTaxCutsBuy`).style.display = "none"
            }
            else {
                document.querySelector(`.earth${capitalizeFirstLetter(p)}AscentionTaxCutsBuy`).style.display = "inline-block"
                document.querySelector(`.moon${capitalizeFirstLetter(p)}AscentionTaxCutsBuy`).style.display = "inline-block"
                document.querySelector(`.mars${capitalizeFirstLetter(p)}AscentionTaxCutsBuy`).style.display = "inline-block"
            }

            if (q.ascend[p].BOGOF.level == q.ascend[p].BOGOF.max){
                document.querySelector(`.earth${capitalizeFirstLetter(p)}AscentionBOGOFBuy`).style.display = "none"
                document.querySelector(`.moon${capitalizeFirstLetter(p)}AscentionBOGOFBuy`).style.display = "none"
                document.querySelector(`.mars${capitalizeFirstLetter(p)}AscentionBOGOFBuy`).style.display = "none"
            }
            else {
                document.querySelector(`.earth${capitalizeFirstLetter(p)}AscentionBOGOFBuy`).style.display = "inline-block"
                document.querySelector(`.moon${capitalizeFirstLetter(p)}AscentionBOGOFBuy`).style.display = "inline-block"
                document.querySelector(`.mars${capitalizeFirstLetter(p)}AscentionBOGOFBuy`).style.display = "inline-block"
            }
        }
    }
    catch(err) {
        reset()
        console.log(err)
    }
}
function updateStats() {
    try {
        q.lastPlayed = Date.now()
        
        
        for (var i of q.planets) {
            
            if (q[i].prestige.amount >= 1) {
                    document.querySelector(`.${i}PrestigeUpgradesButton`).style.display = "block"
            }
            else {
                document.querySelector(`.${i}PrestigeUpgradesButton`).style.display = "none"
            }
            if (q.ascend.amount >= 1) {
                document.querySelector(`.${i}AscentionUpgradesButton`).style.display = "block"
            }
            else {
                document.querySelector(`.${i}AscentionUpgradesButton`).style.display = "none"
            }

            q[i].moneyPerSecond = 0
            for (const iterator of q[i].factories) {
                q[i].moneyPerSecond += q[i][iterator].earn * q[i][iterator].amount
            }
        }
    }   
    catch(err) {
        console.log(err)
        reset()
    }
}


function updatePlanets() {
    try {
        for (var i of q.planets) {
            if (q[i].purchased != undefined) {
                if (q[i].purchased) {
                    document.querySelector(`.${i}LockScreen`).style.display = "none"
                    document.querySelector(`.${i}Content`).style.display = "block"
                }
                else {
                    document.querySelector(`.${i}LockScreen`).style.display = "block"
                    document.querySelector(`.${i}Content`).style.display = "none"
                }
            }
            
        }  
    } 
    catch(err) {
        reset()
        console.log(err)
    }
}

function buyPlanet(p) {
    const planetBefore = q.planets[q.planets.indexOf(p)-1]
    if (q[planetBefore].money < q[p].cost ) {customAlert(`You need $${num2txt(q[p].cost - q[planetBefore].money)} more to do this!`);return false;}
    if (q[planetBefore].prestige.prestigeTokens < q[p].costP) {customAlert(`You need PT$${num2txt(q[p].costP - q[planetBefore].prestige.prestigeTokens)} more to do this!`);return false}
    customConfirm("Are you sure, this is expensive, and you don't get refunds!",() => {
        q[p].purchased = true 
        q[planetBefore].money -= q[p].cost
        q[planetBefore].prestige.prestigeTokens -= q[p].costP
    })
}

function updatePageForAllPlanets() {
    for (var p of q.planets) {
        if (document.querySelector(`.${p}Page${pages[p+"Page"]}`) != undefined) {
            var planetPages = document.getElementsByClassName(`${p}page`)
            for (var i of planetPages) {
                document.querySelector(`.${String(i.className).split(" ")[0]}`).style.display = "none"
            }
            document.querySelector(`.${p}Page${pages[p+"Page"]}`).style.display = "block"
        }
        else {
            if (pages[p+"Page"] > 0) {
                pages[p+"Page"] -= 1
            }
        }
    
        document.querySelector(`.${p}PageDisplay`).innerHTML = `Page: ${pages[p+"Page"]}`
    }

    if (canAscend()) {
        if (pages["marsPage"] == 4) {
            document.querySelector(".marsUp").classList.add("canAscend")
        }
        else {
            document.querySelector(".marsUp").classList.remove("canAscend")
        }
    }
}

function updateAscentionPageForAllPlanets() {
    for (var p of q.planets) {
        if (document.querySelector(`.${p}AscentionPage${pages[p+"AscentionPage"]}`) != undefined) {
            var planetPages = document.getElementsByClassName(`${p}AscentionPage`)
            for (var i of planetPages) {
                document.querySelector(`.${String(i.className).split(" ")[0]}`).style.display = "none"
            }
            document.querySelector(`.${p}AscentionPage${pages[p+"AscentionPage"]}`).style.display = "block"
        }
        else {
            pages[p+"AscentionPage"] -= 1
        }
        
        document.querySelector(`.${p}AscentionPageDisplay`).innerHTML = `Page: ${pages[p+"AscentionPage"]}`
    }
}

function displayStats() {
    try {
        //if statements for preformance since there will be so mnay things updating at once

        //if asteroids hidden
        if (asteroid == 0) {
            var em = q.ascend.earth.multiplier.amount
            var ef= q.earth.prestige.multiplier.amount * em
            

            document.querySelector(".AscendDisplay").innerHTML = `Ascensions: ${q.ascend.amount}`

            document.querySelector(".earthMoneyDisplay").innerHTML = `Money: $${num2txt(q.earth.money)}`
            document.querySelector(".earthUpgradeDisplay").innerHTML = `Costs $${num2txt(q.earth.click.cost)} to upgrade. You currently make $${num2txt(q.earth.click.amount * ef)} per click.`
            document.querySelector(".earthPrestigeDisplay").innerHTML = `Prestiges: ${num2txt(q.earth.prestige.amount)}`
            document.querySelector(".earthTokenDisplay").innerHTML = `PT$:${num2txt(q.earth.prestige.prestigeTokens)}`
            document.querySelector(".earthMoreMoneyDisplay").innerHTML = `The more you buy, the more you multiplier you get. Cost: PT$${num2txt(q.earth.prestige.multiplier.cost)} Multiplier: ${num2txt(q.earth.prestige.multiplier.amount)}`
            document.querySelector(".earthMoreTokensDisplay").innerHTML = `The more you buy, the more you tokens you get per prestige. Cost: PT$${num2txt(q.earth.prestige.tokensAdd.cost)} Extra Money: ${num2txt(q.earth.prestige.tokensAdd.amount - 1)}`
            document.querySelector(".earthNuclearFactoriesDisplay").innerHTML = `Increase production and speed by nuclear power. Cost: PT$${num2txt(q.earth.prestige.nuclearPower.cost)} production is now every ${num2txt(q.earth.prestige.nuclearPower.amount)} ms`
            document.querySelector(".earthTaxCutsDisplay").innerHTML = `Reduce the prices of everything. Cost: PT$${num2txt(q.earth.prestige.taxCuts.cost)} Tax cuts: ${num2txt(q.earth.prestige.taxCuts.amount)}%`
            document.querySelector(".earthBOGOFDisplay").innerHTML = `Increase the amount of free factories you get when BUYING. Cost: PT$${num2txt(q.earth.prestige.BOGOF.cost)} free stuff: ${num2txt(q.earth.prestige.BOGOF.amount)}`


            document.querySelector(".earth_mk1Display").innerHTML = `Mk1 factory: A simple, low tech factory that produces  $${num2txt(q.earth.earth_mk1.earn * ef)} per second and costs $${num2txt(q.earth.earth_mk1.cost)}. You currently have ${num2txt(q.earth.earth_mk1.amount)}.`
            document.querySelector(".earth_mk2Display").innerHTML = `Mk2 factory: A basic factory that makes  $${num2txt(q.earth.earth_mk2.earn* ef)} and costs $${num2txt(q.earth.earth_mk2.cost)}. You currently have ${num2txt(q.earth.earth_mk2.amount)}.`
            document.querySelector(".earth_mk3Display").innerHTML = `Mk3 factory: An average factory that makes $${num2txt(q.earth.earth_mk3.earn* ef)} and costs $${num2txt(q.earth.earth_mk3.cost)}. You currently have ${num2txt(q.earth.earth_mk3.amount)}.`
            document.querySelector(".earth_mk4Display").innerHTML = `Mk4 factory: A high tech factory that costs $${num2txt(q.earth.earth_mk4.cost)}. The price is worth it because it makes you $${num2txt(q.earth.earth_mk4.earn* ef)}. You currently have ${num2txt(q.earth.earth_mk4.amount)}.`
            document.querySelector(".earth_mk5Display").innerHTML = `Mk5 factory: A super high tech factory that is completely automated and makes  $${num2txt(q.earth.earth_mk5.earn* ef)}. However it is not cheap and will cost you a fortune. You currently have ${num2txt(q.earth.earth_mk5.amount)}.`
            document.querySelector(".earth_mk6Display").innerHTML = `mk6 factory: A crazy factory that creates money out of thin air. It makes you $${num2txt(q.earth.earth_mk6.earn* ef)}, but cost you $${num2txt(q.earth.earth_mk6.cost)}. You have ${num2txt(q.earth.earth_mk6.amount)}.`
            document.querySelector(".earth_mk7Display").innerHTML =  `mk7 factory: This factory is so good, the presedent wanted it for himself. It makes you $${num2txt(q.earth.earth_mk7.earn* ef)}, and costs you $${num2txt(q.earth.earth_mk7.cost)}. You own ${num2txt(q.earth.earth_mk7.amount)}.`
            document.querySelector(".earth_mk8Display").innerHTML =  `mk8 factory: This factory is better then its predesesor, and makes $${num2txt(q.earth.earth_mk8.earn* ef)}. It costs $${num2txt(q.earth.earth_mk8.cost)}, and you have ${num2txt(q.earth.earth_mk8.amount)}.`
            document.querySelector(".earth_mk9Display").innerHTML =  `mk9 factory: This amazing brilliant insane epic factory costs $${num2txt(q.earth.earth_mk9.cost)}. It is worth it because it makes you $${num2txt(q.earth.earth_mk9.earn* ef)}. You have ${num2txt(q.earth.earth_mk9.amount)} of them.`
            document.querySelector(".earth_mk10Display").innerHTML = `mk10 factory: This top of the market factory makes all of your other ones useless. It comes with a high price tag of $${num2txt(q.earth.earth_mk10.cost)}. You can flex ${num2txt(q.earth.earth_mk10.amount)} of them.`

            document.querySelector(".earthSuperManagerDisplay").innerHTML = `Super Manager: A person who hires manager and builder for you every 5 minutes. They are not cheap and cost $${num2txt(q.earth.superManager.cost)}. You currently have ${num2txt(q.earth.superManager.amount)}.`
            document.querySelector(".earthManagerDisplay").innerHTML = `Manager: Somone who automatically hires builder so you can keep dreaming about being rich. They cost you $${num2txt(q.earth.manager.cost)}. You have ${num2txt(q.earth.manager.amount)} hired.`
            document.querySelector(".earthBuilderDisplay").innerHTML = `Builder: Somone who automatically builds factories every 15 seconds, so you dont have to. They cost $${num2txt(q.earth.builder.cost)}. You currently have ${num2txt(q.earth.builder.amount)}.`
            document.querySelector(".earthEngineerDisplay").innerHTML = `Engineer: A big brain person who slowly makes your factories more advanced. They cost you $${num2txt(q.earth.engineer.cost)}. You have ${num2txt(q.earth.engineer.amount)} engineer at the moment.`
            
            document.querySelector(".earthNasaEngineerDisplay").innerHTML = `NASA Engineer: This person worked at NASA, and has so much to offer. He will cost you PT$${num2txt(q.earth.prestige.nasaEngineer.cost)}. You have a crew of ${num2txt(q.earth.prestige.nasaEngineer.amount)}. `
            document.querySelector(".earthWizzardDisplay").innerHTML = `Wizzard: A magical person who makes money appear out of thin air. His services will cost you PT$${num2txt(q.earth.prestige.wizzard.cost)}. You have ${num2txt(q.earth.prestige.wizzard.amount)} of them.`
            document.querySelector(".earthHackerManDisplay").innerHTML = `Hacker Man: He will hack into bank accounts and steal money. He charges PT$${num2txt(q.earth.prestige.hackerman.cost)}. You have ${num2txt(q.earth.prestige.hackerman.amount)} of them.`
            document.querySelector(".earthArtistDisplay").innerHTML = `Artist: They will paint pictiures of your money and factories. You can hire them for PT$${num2txt(q.earth.prestige.artist.cost)}, and you have ${num2txt(q.earth.prestige.artist.amount)} of them.`
            document.querySelector(".earthBuisnessManagerDisplay").innerHTML = `Buisness Manager: He will take care of everything you have. He is going to cost you PT$${num2txt(q.earth.prestige.buisnessManager.cost)}. You have ${num2txt(q.earth.prestige.buisnessManager.amount)} of them.`

            document.querySelector(".earthEarthAscentionMultiplierDisplay").innerHTML = `Mutliplier: Increase the amount of money you get from everything. Current cost is $${num2txt(q.ascend.earth.multiplier.cost)} and it is at ${num2txt(q.ascend.earth.multiplier.amount)}`
            document.querySelector(".earthEarthAutoPrintStackDisplay").innerHTML = `Auto print Stack: Makes autoprint better. It costs $${num2txt(q.ascend.earth.autoPrintStack.cost)} and it is ${num2txt(q.ascend.earth.autoPrintStack.amount)}x better!`
            document.querySelector(".earthEarthAutoUpgradeStackDisplay").innerHTML = `Auto Upgrade Stack: Makes auto upgrade better. It costs $${num2txt(q.ascend.earth.autoUpgradeStack.cost)} and it is ${num2txt(q.ascend.earth.autoUpgradeStack.amount)}x better!!!`
            document.querySelector(".earthEarthAtomicPowerDisplay").innerHTML = `Atomic Power: Its like nuclear power but MUCH better. It costs $${num2txt(q.ascend.earth.atomicPower.cost)}, and it is at level ${num2txt(q.ascend.earth.atomicPower.amount)}.`
            document.querySelector(".earthEarthAscentionTaxCutsDisplay").innerHTML = `Tax cuts: More tax cuts means cheaper prices. It costs $${num2txt(q.ascend.earth.taxCuts.cost)} for a new contract, and it is at -${num2txt(q.ascend.earth.taxCuts.amount)}%`
            document.querySelector(".earthEarthAscentionBOGOFDisplay").innerHTML = `Buy one get more free: When you buy something, you get more for free. It costs $${num2txt(q.ascend.earth.BOGOF.cost)} and you get ${num2txt(q.ascend.earth.BOGOF.amount)} for free!`

            document.querySelector(".earthEartharcaneScholarDisplay").innerHTML = `Arcane Scholar: Makes you money so you can sleep. Costs $${num2txt(q.ascend.earth.arcaneScholar.cost)}, and you own ${num2txt(q.ascend.earth.arcaneScholar.amount)}`
            document.querySelector(".earthEarthtechnomancerDisplay").innerHTML = `Technomancer: Makes you more money. Costs $${num2txt(q.ascend.earth.technomancer.cost)}, and you own ${num2txt(q.ascend.earth.technomancer.amount)}`
            document.querySelector(".earthEarthshadowHackerDisplay").innerHTML = `Shadow Hacker: Hacks the matrix and makes lots of money.. Costs $${num2txt(q.ascend.earth.shadowHacker.cost)}, and you own ${num2txt(q.ascend.earth.shadowHacker.amount)}`
            document.querySelector(".earthEarthroguewizzardDisplay").innerHTML = `Rogue Wizzard: This wizzard has been lost for a century so now it makes money. Costs $${num2txt(q.ascend.earth.roguewizzard.cost)}, and you own ${num2txt(q.ascend.earth.roguewizzard.amount)}`
            document.querySelector(".earthEarthEnchanterDisplay").innerHTML = `Enchanter: Enchants your money and makes you soooooo rich. Costs $${num2txt(q.ascend.earth.Enchanter.cost)}, and you own ${num2txt(q.ascend.earth.Enchanter.amount)}`

            document.querySelector('.earthEarthAscentionTokenDisplay').innerHTML = `Tokens: $${num2txt(q.ascend.tokens)}`
            
            document.querySelector(".earthMoonAscentionMultiplierDisplay").innerHTML = `Mutliplier: Increase the amount of money you get from everything. Current cost is $${num2txt(q.ascend.moon.multiplier.cost)} and it is at ${num2txt(q.ascend.moon.multiplier.amount)}`
            document.querySelector(".earthMoonAutoPrintStackDisplay").innerHTML = `Auto print Stack: Makes autoprint better. It costs $${num2txt(q.ascend.moon.autoPrintStack.cost)} and it is ${num2txt(q.ascend.moon.autoPrintStack.amount)}x better!`
            document.querySelector(".earthMoonAutoUpgradeStackDisplay").innerHTML = `Auto Upgrade Stack: Makes auto upgrade better. It costs $${num2txt(q.ascend.moon.autoUpgradeStack.cost)} and it is ${num2txt(q.ascend.moon.autoUpgradeStack.amount)}x better!!!`
            document.querySelector(".earthMoonAtomicPowerDisplay").innerHTML = `Atomic Power: Its like nuclear power but MUCH better. It costs $${num2txt(q.ascend.moon.atomicPower.cost)}, and it is at level ${num2txt(q.ascend.moon.atomicPower.amount)}.`
            document.querySelector(".earthMoonAscentionTaxCutsDisplay").innerHTML = `Tax cuts: More tax cuts means cheaper prices. It costs $${num2txt(q.ascend.moon.taxCuts.cost)} for a new contract, and it is at -${num2txt(q.ascend.moon.taxCuts.amount)}%`
            document.querySelector(".earthMoonAscentionBOGOFDisplay").innerHTML = `Buy one get more free: When you buy something, you get more for free. It costs $${num2txt(q.ascend.moon.BOGOF.cost)} and you get ${num2txt(q.ascend.moon.BOGOF.amount)} for free!`

            document.querySelector(".earthMoonarcaneScholarDisplay").innerHTML = `Arcane Scholar: Makes you money so you can sleep. Costs $${num2txt(q.ascend.moon.arcaneScholar.cost)}, and you own ${num2txt(q.ascend.moon.arcaneScholar.amount)}`
            document.querySelector(".earthMoontechnomancerDisplay").innerHTML = `Technomancer: Makes you more money. Costs $${num2txt(q.ascend.moon.technomancer.cost)}, and you own ${num2txt(q.ascend.moon.technomancer.amount)}`
            document.querySelector(".earthMoonshadowHackerDisplay").innerHTML = `Shadow Hacker: Hacks the matrix and makes lots of money.. Costs $${num2txt(q.ascend.moon.shadowHacker.cost)}, and you own ${num2txt(q.ascend.moon.shadowHacker.amount)}`
            document.querySelector(".earthMoonroguewizzardDisplay").innerHTML = `Rogue Wizzard: This wizzard has been lost for a century so now it makes money. Costs $${num2txt(q.ascend.moon.roguewizzard.cost)}, and you own ${num2txt(q.ascend.moon.roguewizzard.amount)}`
            document.querySelector(".earthMoonEnchanterDisplay").innerHTML = `Enchanter: Enchants your money and makes you soooooo rich. Costs $${num2txt(q.ascend.moon.Enchanter.cost)}, and you own ${num2txt(q.ascend.moon.Enchanter.amount)}`

            document.querySelector('.earthMoonAscentionTokenDisplay').innerHTML = `Tokens: $${num2txt(q.ascend.tokens)}`

            document.querySelector(".earthMarsAscentionMultiplierDisplay").innerHTML = `Mutliplier: Increase the amount of money you get from everything. Current cost is $${num2txt(q.ascend.mars.multiplier.cost)} and it is at ${num2txt(q.ascend.mars.multiplier.amount)}`
            document.querySelector(".earthMarsAutoPrintStackDisplay").innerHTML = `Auto print Stack: Makes autoprint better. It costs $${num2txt(q.ascend.mars.autoPrintStack.cost)} and it is ${num2txt(q.ascend.mars.autoPrintStack.amount)}x better!`
            document.querySelector(".earthMarsAutoUpgradeStackDisplay").innerHTML = `Auto Upgrade Stack: Makes auto upgrade better. It costs $${num2txt(q.ascend.mars.autoUpgradeStack.cost)} and it is ${num2txt(q.ascend.mars.autoUpgradeStack.amount)}x better!!!`
            document.querySelector(".earthMarsAtomicPowerDisplay").innerHTML = `Atomic Power: Its like nuclear power but MUCH better. It costs $${num2txt(q.ascend.mars.atomicPower.cost)}, and it is at level ${num2txt(q.ascend.mars.atomicPower.amount)}.`
            document.querySelector(".earthMarsAscentionTaxCutsDisplay").innerHTML = `Tax cuts: More tax cuts means cheaper prices. It costs $${num2txt(q.ascend.mars.taxCuts.cost)} for a new contract, and it is at -${num2txt(q.ascend.mars.taxCuts.amount)}%`
            document.querySelector(".earthMarsAscentionBOGOFDisplay").innerHTML = `Buy one get more free: When you buy something, you get more for free. It costs $${num2txt(q.ascend.mars.BOGOF.cost)} and you get ${num2txt(q.ascend.mars.BOGOF.amount)} for free!`

            document.querySelector(".earthMarsarcaneScholarDisplay").innerHTML = `Arcane Scholar: Makes you money so you can sleep. Costs $${num2txt(q.ascend.mars.arcaneScholar.cost)}, and you own ${num2txt(q.ascend.mars.arcaneScholar.amount)}`
            document.querySelector(".earthMarstechnomancerDisplay").innerHTML = `Technomancer: Makes you more money. Costs $${num2txt(q.ascend.mars.technomancer.cost)}, and you own ${num2txt(q.ascend.mars.technomancer.amount)}`
            document.querySelector(".earthMarsshadowHackerDisplay").innerHTML = `Shadow Hacker: Hacks the matrix and makes lots of money.. Costs $${num2txt(q.ascend.mars.shadowHacker.cost)}, and you own ${num2txt(q.ascend.mars.shadowHacker.amount)}`
            document.querySelector(".earthMarsroguewizzardDisplay").innerHTML = `Rogue Wizzard: This wizzard has been lost for a century so now it makes money. Costs $${num2txt(q.ascend.mars.roguewizzard.cost)}, and you own ${num2txt(q.ascend.mars.roguewizzard.amount)}`
            document.querySelector(".earthMarsEnchanterDisplay").innerHTML = `Enchanter: Enchants your money and makes you soooooo rich. Costs $${num2txt(q.ascend.mars.Enchanter.cost)}, and you own ${num2txt(q.ascend.mars.Enchanter.amount)}`

            document.querySelector('.earthMarsAscentionTokenDisplay').innerHTML = `Tokens: $${num2txt(q.ascend.tokens)}`    


            document.querySelector(".moonEarthAscentionMultiplierDisplay").innerHTML = `Mutliplier: Increase the amount of money you get from everything. Current cost is $${num2txt(q.ascend.earth.multiplier.cost)} and it is at ${num2txt(q.ascend.earth.multiplier.amount)}`
            document.querySelector(".moonEarthAutoPrintStackDisplay").innerHTML = `Auto print Stack: Makes autoprint better. It costs $${num2txt(q.ascend.earth.autoPrintStack.cost)} and it is ${num2txt(q.ascend.earth.autoPrintStack.amount)}x better!`
            document.querySelector(".moonEarthAutoUpgradeStackDisplay").innerHTML = `Auto Upgrade Stack: Makes auto upgrade better. It costs $${num2txt(q.ascend.earth.autoUpgradeStack.cost)} and it is ${num2txt(q.ascend.earth.autoUpgradeStack.amount)}x better!!!`
            document.querySelector(".moonEarthAtomicPowerDisplay").innerHTML = `Atomic Power: Its like nuclear power but MUCH better. It costs $${num2txt(q.ascend.earth.atomicPower.cost)}, and it is at level ${num2txt(q.ascend.earth.atomicPower.amount)}.`
            document.querySelector(".moonEarthAscentionTaxCutsDisplay").innerHTML = `Tax cuts: More tax cuts means cheaper prices. It costs $${num2txt(q.ascend.earth.taxCuts.cost)} for a new contract, and it is at -${num2txt(q.ascend.earth.taxCuts.amount)}%`
            document.querySelector(".moonEarthAscentionBOGOFDisplay").innerHTML = `Buy one get more free: When you buy something, you get more for free. It costs $${num2txt(q.ascend.earth.BOGOF.cost)} and you get ${num2txt(q.ascend.earth.BOGOF.amount)} for free!`

            document.querySelector(".moonEartharcaneScholarDisplay").innerHTML = `Arcane Scholar: Makes you money so you can sleep. Costs $${num2txt(q.ascend.earth.arcaneScholar.cost)}, and you own ${num2txt(q.ascend.earth.arcaneScholar.amount)}`
            document.querySelector(".moonEarthtechnomancerDisplay").innerHTML = `Technomancer: Makes you more money. Costs $${num2txt(q.ascend.earth.technomancer.cost)}, and you own ${num2txt(q.ascend.earth.technomancer.amount)}`
            document.querySelector(".moonEarthshadowHackerDisplay").innerHTML = `Shadow Hacker: Hacks the matrix and makes lots of money.. Costs $${num2txt(q.ascend.earth.shadowHacker.cost)}, and you own ${num2txt(q.ascend.earth.shadowHacker.amount)}`
            document.querySelector(".moonEarthroguewizzardDisplay").innerHTML = `Rogue Wizzard: This wizzard has been lost for a century so now it makes money. Costs $${num2txt(q.ascend.earth.roguewizzard.cost)}, and you own ${num2txt(q.ascend.earth.roguewizzard.amount)}`
            document.querySelector(".moonEarthEnchanterDisplay").innerHTML = `Enchanter: Enchants your money and makes you soooooo rich. Costs $${num2txt(q.ascend.earth.Enchanter.cost)}, and you own ${num2txt(q.ascend.earth.Enchanter.amount)}`

            document.querySelector('.moonEarthAscentionTokenDisplay').innerHTML = `Tokens: $${num2txt(q.ascend.tokens)}`

            document.querySelector(".moonMoonAscentionMultiplierDisplay").innerHTML = `Mutliplier: Increase the amount of money you get from everything. Current cost is $${num2txt(q.ascend.moon.multiplier.cost)} and it is at ${num2txt(q.ascend.moon.multiplier.amount)}`
            document.querySelector(".moonMoonAutoPrintStackDisplay").innerHTML = `Auto print Stack: Makes autoprint better. It costs $${num2txt(q.ascend.moon.autoPrintStack.cost)} and it is ${num2txt(q.ascend.moon.autoPrintStack.amount)}x better!`
            document.querySelector(".moonMoonAutoUpgradeStackDisplay").innerHTML = `Auto Upgrade Stack: Makes auto upgrade better. It costs $${num2txt(q.ascend.moon.autoUpgradeStack.cost)} and it is ${num2txt(q.ascend.moon.autoUpgradeStack.amount)}x better!!!`
            document.querySelector(".moonMoonAtomicPowerDisplay").innerHTML = `Atomic Power: Its like nuclear power but MUCH better. It costs $${num2txt(q.ascend.moon.atomicPower.cost)}, and it is at level ${num2txt(q.ascend.moon.atomicPower.amount)}.`
            document.querySelector(".moonMoonAscentionTaxCutsDisplay").innerHTML = `Tax cuts: More tax cuts means cheaper prices. It costs $${num2txt(q.ascend.moon.taxCuts.cost)} for a new contract, and it is at -${num2txt(q.ascend.moon.taxCuts.amount)}%`
            document.querySelector(".moonMoonAscentionBOGOFDisplay").innerHTML = `Buy one get more free: When you buy something, you get more for free. It costs $${num2txt(q.ascend.moon.BOGOF.cost)} and you get ${num2txt(q.ascend.moon.BOGOF.amount)} for free!`

            document.querySelector(".moonMoonarcaneScholarDisplay").innerHTML = `Arcane Scholar: Makes you money so you can sleep. Costs $${num2txt(q.ascend.moon.arcaneScholar.cost)}, and you own ${num2txt(q.ascend.moon.arcaneScholar.amount)}`
            document.querySelector(".moonMoontechnomancerDisplay").innerHTML = `Technomancer: Makes you more money. Costs $${num2txt(q.ascend.moon.technomancer.cost)}, and you own ${num2txt(q.ascend.moon.technomancer.amount)}`
            document.querySelector(".moonMoonshadowHackerDisplay").innerHTML = `Shadow Hacker: Hacks the matrix and makes lots of money.. Costs $${num2txt(q.ascend.moon.shadowHacker.cost)}, and you own ${num2txt(q.ascend.moon.shadowHacker.amount)}`
            document.querySelector(".moonMoonroguewizzardDisplay").innerHTML = `Rogue Wizzard: This wizzard has been lost for a century so now it makes money. Costs $${num2txt(q.ascend.moon.roguewizzard.cost)}, and you own ${num2txt(q.ascend.moon.roguewizzard.amount)}`
            document.querySelector(".moonMoonEnchanterDisplay").innerHTML = `Enchanter: Enchants your money and makes you soooooo rich. Costs $${num2txt(q.ascend.moon.Enchanter.cost)}, and you own ${num2txt(q.ascend.moon.Enchanter.amount)}`

            document.querySelector('.moonMoonAscentionTokenDisplay').innerHTML = `Tokens: $${num2txt(q.ascend.tokens)}`

            document.querySelector(".moonMarsAscentionMultiplierDisplay").innerHTML = `Mutliplier: Increase the amount of money you get from everything. Current cost is $${num2txt(q.ascend.mars.multiplier.cost)} and it is at ${num2txt(q.ascend.mars.multiplier.amount)}`
            document.querySelector(".moonMarsAutoPrintStackDisplay").innerHTML = `Auto print Stack: Makes autoprint better. It costs $${num2txt(q.ascend.mars.autoPrintStack.cost)} and it is ${num2txt(q.ascend.mars.autoPrintStack.amount)}x better!`
            document.querySelector(".moonMarsAutoUpgradeStackDisplay").innerHTML = `Auto Upgrade Stack: Makes auto upgrade better. It costs $${num2txt(q.ascend.mars.autoUpgradeStack.cost)} and it is ${num2txt(q.ascend.mars.autoUpgradeStack.amount)}x better!!!`
            document.querySelector(".moonMarsAtomicPowerDisplay").innerHTML = `Atomic Power: Its like nuclear power but MUCH better. It costs $${num2txt(q.ascend.mars.atomicPower.cost)}, and it is at level ${num2txt(q.ascend.mars.atomicPower.amount)}.`
            document.querySelector(".moonMarsAscentionTaxCutsDisplay").innerHTML = `Tax cuts: More tax cuts means cheaper prices. It costs $${num2txt(q.ascend.mars.taxCuts.cost)} for a new contract, and it is at -${num2txt(q.ascend.mars.taxCuts.amount)}%`
            document.querySelector(".moonMarsAscentionBOGOFDisplay").innerHTML = `Buy one get more free: When you buy something, you get more for free. It costs $${num2txt(q.ascend.mars.BOGOF.cost)} and you get ${num2txt(q.ascend.mars.BOGOF.amount)} for free!`

            document.querySelector(".moonMarsarcaneScholarDisplay").innerHTML = `Arcane Scholar: Makes you money so you can sleep. Costs $${num2txt(q.ascend.mars.arcaneScholar.cost)}, and you own ${num2txt(q.ascend.mars.arcaneScholar.amount)}`
            document.querySelector(".moonMarstechnomancerDisplay").innerHTML = `Technomancer: Makes you more money. Costs $${num2txt(q.ascend.mars.technomancer.cost)}, and you own ${num2txt(q.ascend.mars.technomancer.amount)}`
            document.querySelector(".moonMarsshadowHackerDisplay").innerHTML = `Shadow Hacker: Hacks the matrix and makes lots of money.. Costs $${num2txt(q.ascend.mars.shadowHacker.cost)}, and you own ${num2txt(q.ascend.mars.shadowHacker.amount)}`
            document.querySelector(".moonMarsroguewizzardDisplay").innerHTML = `Rogue Wizzard: This wizzard has been lost for a century so now it makes money. Costs $${num2txt(q.ascend.mars.roguewizzard.cost)}, and you own ${num2txt(q.ascend.mars.roguewizzard.amount)}`
            document.querySelector(".moonMarsEnchanterDisplay").innerHTML = `Enchanter: Enchants your money and makes you soooooo rich. Costs $${num2txt(q.ascend.mars.Enchanter.cost)}, and you own ${num2txt(q.ascend.mars.Enchanter.amount)}`

            document.querySelector('.moonMarsAscentionTokenDisplay').innerHTML = `Tokens: $${num2txt(q.ascend.tokens)}`  

            document.querySelector(".marsEarthAscentionMultiplierDisplay").innerHTML = `Mutliplier: Increase the amount of money you get from everything. Current cost is $${num2txt(q.ascend.earth.multiplier.cost)} and it is at ${num2txt(q.ascend.earth.multiplier.amount)}`
            document.querySelector(".marsEarthAutoPrintStackDisplay").innerHTML = `Auto print Stack: Makes autoprint better. It costs $${num2txt(q.ascend.earth.autoPrintStack.cost)} and it is ${num2txt(q.ascend.earth.autoPrintStack.amount)}x better!`
            document.querySelector(".marsEarthAutoUpgradeStackDisplay").innerHTML = `Auto Upgrade Stack: Makes auto upgrade better. It costs $${num2txt(q.ascend.earth.autoUpgradeStack.cost)} and it is ${num2txt(q.ascend.earth.autoUpgradeStack.amount)}x better!!!`
            document.querySelector(".marsEarthAtomicPowerDisplay").innerHTML = `Atomic Power: Its like nuclear power but MUCH better. It costs $${num2txt(q.ascend.earth.atomicPower.cost)}, and it is at level ${num2txt(q.ascend.earth.atomicPower.amount)}.`
            document.querySelector(".marsEarthAscentionTaxCutsDisplay").innerHTML = `Tax cuts: More tax cuts means cheaper prices. It costs $${num2txt(q.ascend.earth.taxCuts.cost)} for a new contract, and it is at -${num2txt(q.ascend.earth.taxCuts.amount)}%`
            document.querySelector(".marsEarthAscentionBOGOFDisplay").innerHTML = `Buy one get more free: When you buy something, you get more for free. It costs $${num2txt(q.ascend.earth.BOGOF.cost)} and you get ${num2txt(q.ascend.earth.BOGOF.amount)} for free!`

            document.querySelector(".marsEartharcaneScholarDisplay").innerHTML = `Arcane Scholar: Makes you money so you can sleep. Costs $${num2txt(q.ascend.earth.arcaneScholar.cost)}, and you own ${num2txt(q.ascend.earth.arcaneScholar.amount)}`
            document.querySelector(".marsEarthtechnomancerDisplay").innerHTML = `Technomancer: Makes you more money. Costs $${num2txt(q.ascend.earth.technomancer.cost)}, and you own ${num2txt(q.ascend.earth.technomancer.amount)}`
            document.querySelector(".marsEarthshadowHackerDisplay").innerHTML = `Shadow Hacker: Hacks the matrix and makes lots of money.. Costs $${num2txt(q.ascend.earth.shadowHacker.cost)}, and you own ${num2txt(q.ascend.earth.shadowHacker.amount)}`
            document.querySelector(".marsEarthroguewizzardDisplay").innerHTML = `Rogue Wizzard: This wizzard has been lost for a century so now it makes money. Costs $${num2txt(q.ascend.earth.roguewizzard.cost)}, and you own ${num2txt(q.ascend.earth.roguewizzard.amount)}`
            document.querySelector(".marsEarthEnchanterDisplay").innerHTML = `Enchanter: Enchants your money and makes you soooooo rich. Costs $${num2txt(q.ascend.earth.Enchanter.cost)}, and you own ${num2txt(q.ascend.earth.Enchanter.amount)}`

            document.querySelector('.marsEarthAscentionTokenDisplay').innerHTML = `Tokens: $${num2txt(q.ascend.tokens)}`

            document.querySelector(".marsMoonAscentionMultiplierDisplay").innerHTML = `Mutliplier: Increase the amount of money you get from everything. Current cost is $${num2txt(q.ascend.moon.multiplier.cost)} and it is at ${num2txt(q.ascend.moon.multiplier.amount)}`
            document.querySelector(".marsMoonAutoPrintStackDisplay").innerHTML = `Auto print Stack: Makes autoprint better. It costs $${num2txt(q.ascend.moon.autoPrintStack.cost)} and it is ${num2txt(q.ascend.moon.autoPrintStack.amount)}x better!`
            document.querySelector(".marsMoonAutoUpgradeStackDisplay").innerHTML = `Auto Upgrade Stack: Makes auto upgrade better. It costs $${num2txt(q.ascend.moon.autoUpgradeStack.cost)} and it is ${num2txt(q.ascend.moon.autoUpgradeStack.amount)}x better!!!`
            document.querySelector(".marsMoonAtomicPowerDisplay").innerHTML = `Atomic Power: Its like nuclear power but MUCH better. It costs $${num2txt(q.ascend.moon.atomicPower.cost)}, and it is at level ${num2txt(q.ascend.moon.atomicPower.amount)}.`
            document.querySelector(".marsMoonAscentionTaxCutsDisplay").innerHTML = `Tax cuts: More tax cuts means cheaper prices. It costs $${num2txt(q.ascend.moon.taxCuts.cost)} for a new contract, and it is at -${num2txt(q.ascend.moon.taxCuts.amount)}%`
            document.querySelector(".marsMoonAscentionBOGOFDisplay").innerHTML = `Buy one get more free: When you buy something, you get more for free. It costs $${num2txt(q.ascend.moon.BOGOF.cost)} and you get ${num2txt(q.ascend.moon.BOGOF.amount)} for free!`

            document.querySelector(".marsMoonarcaneScholarDisplay").innerHTML = `Arcane Scholar: Makes you money so you can sleep. Costs $${num2txt(q.ascend.moon.arcaneScholar.cost)}, and you own ${num2txt(q.ascend.moon.arcaneScholar.amount)}`
            document.querySelector(".marsMoontechnomancerDisplay").innerHTML = `Technomancer: Makes you more money. Costs $${num2txt(q.ascend.moon.technomancer.cost)}, and you own ${num2txt(q.ascend.moon.technomancer.amount)}`
            document.querySelector(".marsMoonshadowHackerDisplay").innerHTML = `Shadow Hacker: Hacks the matrix and makes lots of money.. Costs $${num2txt(q.ascend.moon.shadowHacker.cost)}, and you own ${num2txt(q.ascend.moon.shadowHacker.amount)}`
            document.querySelector(".marsMoonroguewizzardDisplay").innerHTML = `Rogue Wizzard: This wizzard has been lost for a century so now it makes money. Costs $${num2txt(q.ascend.moon.roguewizzard.cost)}, and you own ${num2txt(q.ascend.moon.roguewizzard.amount)}`
            document.querySelector(".marsMoonEnchanterDisplay").innerHTML = `Enchanter: Enchants your money and makes you soooooo rich. Costs $${num2txt(q.ascend.moon.Enchanter.cost)}, and you own ${num2txt(q.ascend.moon.Enchanter.amount)}`

            document.querySelector('.marsMoonAscentionTokenDisplay').innerHTML = `Tokens: $${num2txt(q.ascend.tokens)}`

            document.querySelector(".marsMarsAscentionMultiplierDisplay").innerHTML = `Mutliplier: Increase the amount of money you get from everything. Current cost is $${num2txt(q.ascend.mars.multiplier.cost)} and it is at ${num2txt(q.ascend.mars.multiplier.amount)}`
            document.querySelector(".marsMarsAutoPrintStackDisplay").innerHTML = `Auto print Stack: Makes autoprint better. It costs $${num2txt(q.ascend.mars.autoPrintStack.cost)} and it is ${num2txt(q.ascend.mars.autoPrintStack.amount)}x better!`
            document.querySelector(".marsMarsAutoUpgradeStackDisplay").innerHTML = `Auto Upgrade Stack: Makes auto upgrade better. It costs $${num2txt(q.ascend.mars.autoUpgradeStack.cost)} and it is ${num2txt(q.ascend.mars.autoUpgradeStack.amount)}x better!!!`
            document.querySelector(".marsMarsAtomicPowerDisplay").innerHTML = `Atomic Power: Its like nuclear power but MUCH better. It costs $${num2txt(q.ascend.mars.atomicPower.cost)}, and it is at level ${num2txt(q.ascend.mars.atomicPower.amount)}.`
            document.querySelector(".marsMarsAscentionTaxCutsDisplay").innerHTML = `Tax cuts: More tax cuts means cheaper prices. It costs $${num2txt(q.ascend.mars.taxCuts.cost)} for a new contract, and it is at -${num2txt(q.ascend.mars.taxCuts.amount)}%`
            document.querySelector(".marsMarsAscentionBOGOFDisplay").innerHTML = `Buy one get more free: When you buy something, you get more for free. It costs $${num2txt(q.ascend.mars.BOGOF.cost)} and you get ${num2txt(q.ascend.mars.BOGOF.amount)} for free!`

            document.querySelector(".marsMarsarcaneScholarDisplay").innerHTML = `Arcane Scholar: Makes you money so you can sleep. Costs $${num2txt(q.ascend.mars.arcaneScholar.cost)}, and you own ${num2txt(q.ascend.mars.arcaneScholar.amount)}`
            document.querySelector(".marsMarstechnomancerDisplay").innerHTML = `Technomancer: Makes you more money. Costs $${num2txt(q.ascend.mars.technomancer.cost)}, and you own ${num2txt(q.ascend.mars.technomancer.amount)}`
            document.querySelector(".marsMarsshadowHackerDisplay").innerHTML = `Shadow Hacker: Hacks the matrix and makes lots of money.. Costs $${num2txt(q.ascend.mars.shadowHacker.cost)}, and you own ${num2txt(q.ascend.mars.shadowHacker.amount)}`
            document.querySelector(".marsMarsroguewizzardDisplay").innerHTML = `Rogue Wizzard: This wizzard has been lost for a century so now it makes money. Costs $${num2txt(q.ascend.mars.roguewizzard.cost)}, and you own ${num2txt(q.ascend.mars.roguewizzard.amount)}`
            document.querySelector(".marsMarsEnchanterDisplay").innerHTML = `Enchanter: Enchants your money and makes you soooooo rich. Costs $${num2txt(q.ascend.mars.Enchanter.cost)}, and you own ${num2txt(q.ascend.mars.Enchanter.amount)}`

            document.querySelector('.marsMarsAscentionTokenDisplay').innerHTML = `Tokens: $${num2txt(q.ascend.tokens)}`  

            // Moon factories
            var em = q.ascend.moon.multiplier.amount
            var ef= q.moon.prestige.multiplier.amount * em

            document.querySelector(".moonTokenDisplay").innerHTML = `PT$:${num2txt(q.moon.prestige.prestigeTokens)}`
            document.querySelector(".moonMoreMoneyDisplay").innerHTML = `The more you buy, the more you multiplier you get. Cost: PT$${num2txt(q.moon.prestige.multiplier.cost)} Multiplier: ${num2txt(q.moon.prestige.multiplier.amount)}`
            document.querySelector(".moonMoreTokensDisplay").innerHTML = `The more you buy, the more you tokens you get per prestige. Cost: PT$${num2txt(q.moon.prestige.tokensAdd.cost)} Extra Money: ${num2txt(q.moon.prestige.tokensAdd.amount - 1)}`
            document.querySelector(".moonNuclearFactoriesDisplay").innerHTML = `Increase production and speed by nuclear power. Cost: PT$${num2txt(q.moon.prestige.nuclearPower.cost)} production is now every ${num2txt(q.moon.prestige.nuclearPower.amount)} ms`
            document.querySelector(".moonTaxCutsDisplay").innerHTML = `Reduce the prices of everything. Cost: PT$${num2txt(q.moon.prestige.taxCuts.cost)} Tax cuts: ${num2txt(q.moon.prestige.taxCuts.amount)}%`
            document.querySelector(".moonBOGOFDisplay").innerHTML = `Increase the amount of free factories you get when BUYING. Cost: PT$${num2txt(q.moon.prestige.BOGOF.cost)} free stuff: ${num2txt(q.moon.prestige.BOGOF.amount)}`
            document.querySelector(".moon_mk1Display").innerHTML = `Moon Mk1: The first factory on the moon. Cost: $${num2txt(q.moon.moon_mk1.cost)}. You own ${num2txt(q.moon.moon_mk1.amount)} of them. It's a small step for a factory, but a giant leap for your empire.`;
            document.querySelector(".moon_mk2Display").innerHTML = `Moon Mk2: This upgraded factory generates ${num2txt(q.moon.moon_mk2.earn* ef)} per second. Cost: $${num2txt(q.moon.moon_mk2.cost)}. You have ${num2txt(q.moon.moon_mk2.amount)} of them.`;
            document.querySelector(".moon_mk3Display").innerHTML = `Moon Mk3: The moon's weak radiation amplifies this factory to generate ${num2txt(q.moon.moon_mk3.earn)} per second. Cost: $${num2txt(q.moon.moon_mk3.cost)}. You have ${num2txt(q.moon.moon_mk3.amount)} of them.`;
            document.querySelector(".moon_mk4Display").innerHTML = `Moon Mk4: Generates ${num2txt(q.moon.moon_mk4.earn * ef)} per second. Cost: $${num2txt(q.moon.moon_mk4.cost)}. You own ${num2txt(q.moon.moon_mk4.amount)} of them.`;
            document.querySelector(".moon_mk5Display").innerHTML = `Moon Mk5: Produces ${num2txt(q.moon.moon_mk5.earn * ef)} per second. Cost: $${num2txt(q.moon.moon_mk5.cost)}. You own ${num2txt(q.moon.moon_mk5.amount)} of them.`;
            document.querySelector(".moon_mk6Display").innerHTML = `Moon Mk6: This top of the line factory generates ${num2txt(q.moon.moon_mk6.earn* ef)} per second. Cost: $${num2txt(q.moon.moon_mk6.cost)}. You own ${num2txt(q.moon.moon_mk6.amount)} of them.`;
            document.querySelector(".moon_mk7Display").innerHTML = `Moon Mk7: A game-changing moon factory that's revolutionizing the industry. Generates ${num2txt(q.moon.moon_mk7.earn* ef)} per second. Cost: $${num2txt(q.moon.moon_mk7.cost)}. You own ${num2txt(q.moon.moon_mk7.amount)} of them.`;
            document.querySelector(".moon_mk8Display").innerHTML = `Moon Mk8: An industry-leading moon factory that's setting the bar for all others. ${num2txt(q.moon.moon_mk8.earn* ef)} per second. Cost: $${num2txt(q.moon.moon_mk8.cost)}. You own ${num2txt(q.moon.moon_mk8.amount)} of them. You're unstoppable.`;
            document.querySelector(".moon_mk9Display").innerHTML = `Moon Mk9: This factory generates ${num2txt(q.moon.moon_mk9.earn* ef)} per second. Cost: $${num2txt(q.moon.moon_mk9.cost)}. You own ${num2txt(q.moon.moon_mk9.amount)} of them. You're on top of the world.`;
            document.querySelector(".moon_mk10Display").innerHTML = `Moon Mk10: An impressive moon factory that's making waves across the galaxy! Cost: $${num2txt(q.moon.moon_mk10.cost)}. You own ${num2txt(q.moon.moon_mk10.amount)} of them. It's the crown jewel of your empire.`;


            document.querySelector(".moon_hab_mk1Display").innerHTML = `Habitat Mk1 Factory: This simple and cozy habitat is perfect for starting your lunar colony. It costs $${num2txt(q.moon.moon_hab_mk1.cost)} and can house ${num2txt(q.moon.moon_hab_mk1.population)} colonists. You own ${q.moon.moon_hab_mk1.amount} of them.`;
            document.querySelector(".moon_hab_mk2Display").innerHTML = `Habitat Mk2 Factory: With a bit more space and amenities, this habitat can house ${num2txt(q.moon.moon_hab_mk2.population)} colonists. It costs $${num2txt(q.moon.moon_hab_mk2.cost)} to build. You own ${q.moon.moon_hab_mk2.amount} of them.`;
            document.querySelector(".moon_hab_mk3Display").innerHTML = `Habitat Mk3 Factory: This spacious and luxurious habitat can house ${num2txt(q.moon.moon_hab_mk3.population)} colonists. It costs $${num2txt(q.moon.moon_hab_mk3.cost)} to build and comes with a built-in moon garden. You own ${q.moon.moon_hab_mk3.amount} of them.`;
            document.querySelector(".moon_hab_mk4Display").innerHTML = `Habitat Mk4 Factory: This top-of-the-line habitat can house ${num2txt(q.moon.moon_hab_mk4.population)} colonists and comes with a personal cinema and gym. It costs $${num2txt(q.moon.moon_hab_mk4.cost)} to build. You own ${q.moon.moon_hab_mk4.amount} of them.`;
            document.querySelector(".moon_hab_mk5Display").innerHTML = `Habitat Mk5 Factory: The ultimate in lunar living, and comes with a private moon beach and lunar jacuzzi. It costs $${num2txt(q.moon.moon_hab_mk5.cost)} to build. You can flex ${q.moon.moon_hab_mk5.amount} of them.`;
            document.querySelector(".moon_reactor_mk1Display").innerHTML = `Fusion Reactor Mk1: produces ${num2txt(q.moon.moon_reactor_mk1.produce)} electricity for a cost of $${num2txt(q.moon.moon_reactor_mk1.cost)}. You have ${num2txt(q.moon.moon_reactor_mk1.amount)} of them.`;
            document.querySelector(".moon_reactor_mk2Display").innerHTML = `Fusion Reactor Mk2: produces ${num2txt(q.moon.moon_reactor_mk2.produce)} electricity for a cost of $${num2txt(q.moon.moon_reactor_mk2.cost)}. You can operate ${num2txt(q.moon.moon_reactor_mk2.amount)} reactors.`;
            document.querySelector(".moon_reactor_mk3Display").innerHTML = `Fusion Reactor Mk3: produces ${num2txt(q.moon.moon_reactor_mk3.produce)} electricity for a cost of $${num2txt(q.moon.moon_reactor_mk3.cost)}. Your energy supply will never be the same with ${num2txt(q.moon.moon_reactor_mk3.amount)} reactors in use!`;
            document.querySelector(".moon_reactor_mk4Display").innerHTML = `Fusion Reactor Mk4: produces ${num2txt(q.moon.moon_reactor_mk4.produce)} electricity for a cost of $${num2txt(q.moon.moon_reactor_mk4.cost)}. You own ${num2txt(q.moon.moon_reactor_mk4.amount)} of these advanced reactors.`;
            document.querySelector(".moon_reactor_mk5Display").innerHTML = `Fusion Reactor Mk5: produces ${num2txt(q.moon.moon_reactor_mk5.produce)} electricity for a cost of $${num2txt(q.moon.moon_reactor_mk5.cost)}. With ${num2txt(q.moon.moon_reactor_mk5.amount)} of these powerful reactors, you will never run out of energy!`;
            document.querySelector(".moon_farm_mk1Display").innerHTML = `Lunar Farm Mk1: produces ${num2txt(q.moon.moon_farm_mk1.produce)} food for a cost of $${num2txt(q.moon.moon_farm_mk1.cost)}. With ${num2txt(q.moon.moon_farm_mk1.amount)} of these farms, your population will never go hungry!`;
            document.querySelector(".moon_farm_mk2Display").innerHTML = `Lunar Farm Mk2: produces ${num2txt(q.moon.moon_farm_mk2.produce)} food for a cost of $${num2txt(q.moon.moon_farm_mk2.cost)}. With ${num2txt(q.moon.moon_farm_mk2.amount)} of these advanced farms, your people will be well-fed!`;
            document.querySelector(".moon_farm_mk3Display").innerHTML = `Lunar Farm Mk3: produces ${num2txt(q.moon.moon_farm_mk3.produce)} food for a cost of $${num2txt(q.moon.moon_farm_mk3.cost)}. With ${num2txt(q.moon.moon_farm_mk3.amount)} of these high-tech farms, you'll be able to feed a growing population!`;
            document.querySelector(".moon_farm_mk4Display").innerHTML = `Lunar Farm Mk4: produces ${num2txt(q.moon.moon_farm_mk4.produce)} food for a cost of $${num2txt(q.moon.moon_farm_mk4.cost)}. With ${num2txt(q.moon.moon_farm_mk4.amount)} of these state-of-the-art farms, your people will thrive!`;
            document.querySelector(".moon_farm_mk5Display").innerHTML = `Lunar Farm Mk5: produces ${num2txt(q.moon.moon_farm_mk5.produce)} food for a cost of $${num2txt(q.moon.moon_farm_mk5.cost)}. With ${num2txt(q.moon.moon_farm_mk5.amount)} of these cutting-edge farms, your lunar colony will become a breadbasket!`;
            document.querySelector('.moon_watermaker_mk1Display').innerHTML = `Water Maker Mk1: produces ${num2txt(q.moon.moon_watermaker_mk1.produce)} water for a cost of $${num2txt(q.moon.moon_watermaker_mk1.cost)}. With ${num2txt(q.moon.moon_watermaker_mk1.amount)} of these, your colony will never go thirsty!`;
            document.querySelector('.moon_watermaker_mk2Display').innerHTML = `Water Maker Mk2: produces ${num2txt(q.moon.moon_watermaker_mk2.produce)} water for a cost of $${num2txt(q.moon.moon_watermaker_mk2.cost)}. With ${num2txt(q.moon.moon_watermaker_mk2.amount)} of these, your colony will have all the water it needs!`;
            document.querySelector('.moon_watermaker_mk3Display').innerHTML = `Water Maker Mk3: produces ${num2txt(q.moon.moon_watermaker_mk3.produce)} water for a cost of $${num2txt(q.moon.moon_watermaker_mk3.cost)}. With ${num2txt(q.moon.moon_watermaker_mk3.amount)} of these, you'll have plenty of water to spare!`;
            document.querySelector('.moon_watermaker_mk4Display').innerHTML = `Water Maker Mk4: produces ${num2txt(q.moon.moon_watermaker_mk4.produce)} water for a cost of $${num2txt(q.moon.moon_watermaker_mk4.cost)}. With ${num2txt(q.moon.moon_watermaker_mk4.amount)} of these, you'll have water in abundance!`;
            document.querySelector('.moon_watermaker_mk5Display').innerHTML = `Water Maker Mk5: produces ${num2txt(q.moon.moon_watermaker_mk5.produce)} water for a cost of $${num2txt(q.moon.moon_watermaker_mk5.cost)}. With ${num2txt(q.moon.moon_watermaker_mk5.amount)} of these, your colony will have an unlimited supply of water!`;
            document.querySelector(".moonPrestigeDisplay").innerHTML = `Prestiges: ${num2txt(q.moon.prestige.amount)}`
            
            document.querySelector(".moonNasaEngineerDisplay").innerHTML = `NASA Engineer: This person worked at NASA, and has so much to offer. He will cost you PT$${num2txt(q.moon.prestige.nasaEngineer.cost)}. You have a crew of ${num2txt(q.moon.prestige.nasaEngineer.amount)}. `
            document.querySelector(".moonWizzardDisplay").innerHTML = `Wizzard: A magical person who makes money appear out of thin air. His services will cost you PT$${num2txt(q.moon.prestige.wizzard.cost)}. You have ${num2txt(q.moon.prestige.wizzard.amount)} of them.`
            document.querySelector(".moonHackerManDisplay").innerHTML = `Hacker Man: He will hack into bank accounts and steal money. He charges PT$${num2txt(q.moon.prestige.hackerman.cost)}. You have ${num2txt(q.moon.prestige.hackerman.amount)} of them.`
            document.querySelector(".moonArtistDisplay").innerHTML = `Artist: They will paint pictiures of your money and factories. You can hire them for PT$${num2txt(q.moon.prestige.artist.cost)}, and you have ${num2txt(q.moon.prestige.artist.amount)} of them.`
            document.querySelector(".moonBuisnessManagerDisplay").innerHTML = `Buisness Manager: He will take care of everything you have. He is going to cost you PT$${num2txt(q.moon.prestige.buisnessManager.cost)}. You have ${num2txt(q.moon.prestige.buisnessManager.amount)} of them.`
            
            document.querySelector(".moonMoneyDisplay").innerHTML = `Moon Money: M$${num2txt(q.moon.money)}`
            document.querySelector(".moonColonistsDisplay").innerHTML = `Moon Colonists: Necessary for making money on the moon. You need to keep them alive however. They cost M$${num2txt(q.moon.colonists.cost)} to train, and you have ${num2txt(q.moon.colonists.amount)}`

            document.querySelector(".moonBuilderDisplay").innerHTML = `Builder: A person who automatically builds factories, reactors, habs, farms, and water makers, so you can sit down and relax. They cost M$${num2txt(q.moon.builder.cost)}! You have ${num2txt(q.moon.builder.amount)}!`
            document.querySelector(".moonManagerDisplay").innerHTML = `Manager: A person who hires builders,engineers,and colonists so you can work hard, or hardly work. They cost M$${num2txt(q.moon.manager.cost)} and you have ${num2txt(q.moon.manager.amount)}!`
            document.querySelector(".moonEngineerDisplay").innerHTML = `Engineer: A person who upgrades factories for you. They are important, if you want to increase profits steadily. They cost M$${num2txt(q.moon.engineer.cost)} and you have ${num2txt(q.moon.engineer.amount)} hires.`
            document.querySelector(".moonSuperManagerDisplay").innerHTML = `Super Manager: An upgraded version of a manager who also hires managers. This makes profits sky rocket. They cost you a ridiculous M$${num2txt(q.moon.superManager.cost)}!!!!!`

            document.querySelector(".moonUpgradeDisplay").innerHTML = `Costs ${num2txt(q.moon.click.cost)} to upgrade. You currently make M$${num2txt(q.moon.click.amount * ef)} per click.`

            document.querySelector(".moonFoodDisplay").innerHTML = `Food: ${num2txt(q.moon.food)}`
            document.querySelector(".moonWaterDisplay").innerHTML = `Water: ${num2txt(q.moon.water)}`
            document.querySelector(".moonEnergyDisplay").innerHTML = `Energy: ${num2txt(q.moon.energy)}`
            document.querySelector(".moonPopulationDisplay").innerHTML = `Population: ${num2txt(q.moon.population)}`


            document.querySelector(".moonAutoPrintMoneyDisplay").innerHTML = `Auto Print: Automatically print money $$$ Costs M$${num2txt(q.moon.autoPrint.cost)} to activate!`
            document.querySelector(".moonAutoUpgradeDisplay").innerHTML = `Auto Upgrade: Automatically upgrades your printer, so you can keep on printing. It costs M$${num2txt(q.moon.autoUpgrade.cost)} to start!`

            var em = q.ascend.mars.multiplier.amount
            var ef= q.mars.prestige.multiplier.amount * em

            document.querySelector(".marsTokenDisplay").innerHTML = `PT$:${num2txt(q.mars.prestige.prestigeTokens)}`
            document.querySelector(".marsMoreMoneyDisplay").innerHTML = `The more you buy, the more you multiplier you get. Cost: PT$${num2txt(q.mars.prestige.multiplier.cost)} Multiplier: ${num2txt(q.mars.prestige.multiplier.amount)}`
            document.querySelector(".marsMoreTokensDisplay").innerHTML = `The more you buy, the more you tokens you get per prestige. Cost: PT$${num2txt(q.mars.prestige.tokensAdd.cost)} Extra Money: ${num2txt(q.mars.prestige.tokensAdd.amount - 1)}`
            document.querySelector(".marsNuclearFactoriesDisplay").innerHTML = `Increase production and speed by nuclear power. Cost: PT$${num2txt(q.mars.prestige.nuclearPower.cost)} production is now every ${num2txt(q.mars.prestige.nuclearPower.amount)} ms`
            document.querySelector(".marsTaxCutsDisplay").innerHTML = `Reduce the prices of everything. Cost: PT$${num2txt(q.mars.prestige.taxCuts.cost)} Tax cuts: ${num2txt(q.mars.prestige.taxCuts.amount)}%`
            document.querySelector(".marsBOGOFDisplay").innerHTML = `Increase the amount of free factories you get when BUYING. Cost: PT$${num2txt(q.mars.prestige.BOGOF.cost)} free stuff: ${num2txt(q.mars.prestige.BOGOF.amount)}`
            document.querySelector(".mars_mk1Display").innerHTML = `Mars Mk1: The first factory on mars. Cost: $${num2txt(q.mars.mars_mk1.cost)}. You own ${num2txt(q.mars.mars_mk1.amount)} of them. It's a small step for a factory, but a giant leap for your empire.`;
            document.querySelector(".mars_mk2Display").innerHTML = `Mars Mk2: This upgraded factory generates ${num2txt(q.mars.mars_mk2.earn* ef)} per second. Cost: $${num2txt(q.mars.mars_mk2.cost)}. You have ${num2txt(q.mars.mars_mk2.amount)} of them.`;
            document.querySelector(".mars_mk3Display").innerHTML = `Mars Mk3: The mars's weak radiation amplifies this factory to generate ${num2txt(q.mars.mars_mk3.earn* ef)} per second. Cost: $${num2txt(q.mars.mars_mk3.cost)}. You have ${num2txt(q.mars.mars_mk3.amount)} of them.`;
            document.querySelector(".mars_mk4Display").innerHTML = `Mars Mk4: Generates ${num2txt(q.mars.mars_mk4.earn* ef)} per second. Cost: $${num2txt(q.mars.mars_mk4.cost)}. You own ${num2txt(q.mars.mars_mk4.amount)} of them.`;
            document.querySelector(".mars_mk5Display").innerHTML = `Mars Mk5: Produces ${num2txt(q.mars.mars_mk5.earn* ef)} per second. Cost: $${num2txt(q.mars.mars_mk5.cost)}. You own ${num2txt(q.mars.mars_mk5.amount)} of them.`;
            document.querySelector(".mars_mk6Display").innerHTML = `Mars Mk6: This top of the line factory generates ${num2txt(q.mars.mars_mk6.earn* ef)} per second. Cost: $${num2txt(q.mars.mars_mk6.cost)}. You own ${num2txt(q.mars.mars_mk6.amount)} of them.`;
            document.querySelector(".mars_mk7Display").innerHTML = `Mars Mk7: A game-changing mars factory that's revolutionizing the industry. Generates ${num2txt(q.mars.mars_mk7.earn* ef)} per second. Cost: $${num2txt(q.mars.mars_mk7.cost)}. You own ${num2txt(q.mars.mars_mk7.amount)} of them.`;
            document.querySelector(".mars_mk8Display").innerHTML = `Mars Mk8: An industry-leading mars factory that's setting the bar for all others. ${num2txt(q.mars.mars_mk8.earn* ef)} per second. Cost: $${num2txt(q.mars.mars_mk8.cost)}. You own ${num2txt(q.mars.mars_mk8.amount)} of them. You're unstoppable.`;
            document.querySelector(".mars_mk9Display").innerHTML = `Mars Mk9: This factory generates ${num2txt(q.mars.mars_mk9.earn* ef)} per second. Cost: $${num2txt(q.mars.mars_mk9.cost)}. You own ${num2txt(q.mars.mars_mk9.amount)} of them. You're on top of the world.`;
            document.querySelector(".mars_mk10Display").innerHTML = `Mars Mk10: An impressive mars factory that's making waves across the galaxy! Cost: $${num2txt(q.mars.mars_mk10.cost)}. You own ${num2txt(q.mars.mars_mk10.amount)} of them. It's the crown jewel of your empire.`;


            document.querySelector(".mars_hab_mk1Display").innerHTML = `Habitat Mk1 Factory: This simple and cozy habitat is perfect for starting your martian colony. It costs $${num2txt(q.mars.mars_hab_mk1.cost)} and can house ${num2txt(q.mars.mars_hab_mk1.population)} colonists. You own ${q.mars.mars_hab_mk1.amount} of them.`;
            document.querySelector(".mars_hab_mk2Display").innerHTML = `Habitat Mk2 Factory: With a bit more space and amenities, this habitat can house ${num2txt(q.mars.mars_hab_mk2.population)} colonists. It costs $${num2txt(q.mars.mars_hab_mk2.cost)} to build. You own ${q.mars.mars_hab_mk2.amount} of them.`;
            document.querySelector(".mars_hab_mk3Display").innerHTML = `Habitat Mk3 Factory: This spacious and luxurious habitat can house ${num2txt(q.mars.mars_hab_mk3.population)} colonists. It costs $${num2txt(q.mars.mars_hab_mk3.cost)} to build and comes with a built-in mars garden. You own ${q.mars.mars_hab_mk3.amount} of them.`;
            document.querySelector(".mars_hab_mk4Display").innerHTML = `Habitat Mk4 Factory: This top-of-the-line habitat can house ${num2txt(q.mars.mars_hab_mk4.population)} colonists and comes with a personal cinema and gym. It costs $${num2txt(q.mars.mars_hab_mk4.cost)} to build. You own ${q.mars.mars_hab_mk4.amount} of them.`;
            document.querySelector(".mars_hab_mk5Display").innerHTML = `Habitat Mk5 Factory: The ultimate in martian living, and comes with a private mars beach and martian jacuzzi. It costs $${num2txt(q.mars.mars_hab_mk5.cost)} to build. You can flex ${q.mars.mars_hab_mk5.amount} of them.`;
            document.querySelector(".mars_reactor_mk1Display").innerHTML = `Fusion Reactor Mk1: produces ${num2txt(q.mars.mars_reactor_mk1.produce)} electricity for a cost of $${num2txt(q.mars.mars_reactor_mk1.cost)}. You have ${num2txt(q.mars.mars_reactor_mk1.amount)} of them.`;
            document.querySelector(".mars_reactor_mk2Display").innerHTML = `Fusion Reactor Mk2: produces ${num2txt(q.mars.mars_reactor_mk2.produce)} electricity for a cost of $${num2txt(q.mars.mars_reactor_mk2.cost)}. You can operate ${num2txt(q.mars.mars_reactor_mk2.amount)} reactors.`;
            document.querySelector(".mars_reactor_mk3Display").innerHTML = `Fusion Reactor Mk3: produces ${num2txt(q.mars.mars_reactor_mk3.produce)} electricity for a cost of $${num2txt(q.mars.mars_reactor_mk3.cost)}. Your energy supply will never be the same with ${num2txt(q.mars.mars_reactor_mk3.amount)} reactors in use!`;
            document.querySelector(".mars_reactor_mk4Display").innerHTML = `Fusion Reactor Mk4: produces ${num2txt(q.mars.mars_reactor_mk4.produce)} electricity for a cost of $${num2txt(q.mars.mars_reactor_mk4.cost)}. You own ${num2txt(q.mars.mars_reactor_mk4.amount)} of these advanced reactors.`;
            document.querySelector(".mars_reactor_mk5Display").innerHTML = `Fusion Reactor Mk5: produces ${num2txt(q.mars.mars_reactor_mk5.produce)} electricity for a cost of $${num2txt(q.mars.mars_reactor_mk5.cost)}. With ${num2txt(q.mars.mars_reactor_mk5.amount)} of these powerful reactors, you will never run out of energy!`;
            document.querySelector(".mars_farm_mk1Display").innerHTML = `Martian Farm Mk1: produces ${num2txt(q.mars.mars_farm_mk1.produce)} food for a cost of $${num2txt(q.mars.mars_farm_mk1.cost)}. With ${num2txt(q.mars.mars_farm_mk1.amount)} of these farms, your population will never go hungry!`;
            document.querySelector(".mars_farm_mk2Display").innerHTML = `Martian Farm Mk2: produces ${num2txt(q.mars.mars_farm_mk2.produce)} food for a cost of $${num2txt(q.mars.mars_farm_mk2.cost)}. With ${num2txt(q.mars.mars_farm_mk2.amount)} of these advanced farms, your people will be well-fed!`;
            document.querySelector(".mars_farm_mk3Display").innerHTML = `Martian Farm Mk3: produces ${num2txt(q.mars.mars_farm_mk3.produce)} food for a cost of $${num2txt(q.mars.mars_farm_mk3.cost)}. With ${num2txt(q.mars.mars_farm_mk3.amount)} of these high-tech farms, you'll be able to feed a growing population!`;
            document.querySelector(".mars_farm_mk4Display").innerHTML = `Martian Farm Mk4: produces ${num2txt(q.mars.mars_farm_mk4.produce)} food for a cost of $${num2txt(q.mars.mars_farm_mk4.cost)}. With ${num2txt(q.mars.mars_farm_mk4.amount)} of these state-of-the-art farms, your people will thrive!`;
            document.querySelector(".mars_farm_mk5Display").innerHTML = `Martian Farm Mk5: produces ${num2txt(q.mars.mars_farm_mk5.produce)} food for a cost of $${num2txt(q.mars.mars_farm_mk5.cost)}. With ${num2txt(q.mars.mars_farm_mk5.amount)} of these cutting-edge farms, your martian colony will become a breadbasket!`;
            document.querySelector('.mars_watermaker_mk1Display').innerHTML = `Water Maker Mk1: produces ${num2txt(q.mars.mars_watermaker_mk1.produce)} water for a cost of $${num2txt(q.mars.mars_watermaker_mk1.cost)}. With ${num2txt(q.mars.mars_watermaker_mk1.amount)} of these, your colony will never go thirsty!`;
            document.querySelector('.mars_watermaker_mk2Display').innerHTML = `Water Maker Mk2: produces ${num2txt(q.mars.mars_watermaker_mk2.produce)} water for a cost of $${num2txt(q.mars.mars_watermaker_mk2.cost)}. With ${num2txt(q.mars.mars_watermaker_mk2.amount)} of these, your colony will have all the water it needs!`;
            document.querySelector('.mars_watermaker_mk3Display').innerHTML = `Water Maker Mk3: produces ${num2txt(q.mars.mars_watermaker_mk3.produce)} water for a cost of $${num2txt(q.mars.mars_watermaker_mk3.cost)}. With ${num2txt(q.mars.mars_watermaker_mk3.amount)} of these, you'll have plenty of water to spare!`;
            document.querySelector('.mars_watermaker_mk4Display').innerHTML = `Water Maker Mk4: produces ${num2txt(q.mars.mars_watermaker_mk4.produce)} water for a cost of $${num2txt(q.mars.mars_watermaker_mk4.cost)}. With ${num2txt(q.mars.mars_watermaker_mk4.amount)} of these, you'll have water in abundance!`;
            document.querySelector('.mars_watermaker_mk5Display').innerHTML = `Water Maker Mk5: produces ${num2txt(q.mars.mars_watermaker_mk5.produce)} water for a cost of $${num2txt(q.mars.mars_watermaker_mk5.cost)}. With ${num2txt(q.mars.mars_watermaker_mk5.amount)} of these, your colony will have an unlimited supply of water!`;
            document.querySelector(".marsPrestigeDisplay").innerHTML = `Prestiges: ${num2txt(q.mars.prestige.amount)}`

            document.querySelector(".marsNasaEngineerDisplay").innerHTML = `NASA Engineer: This person worked at NASA, and has so much to offer. He will cost you PT$${num2txt(q.mars.prestige.nasaEngineer.cost)}. You have a crew of ${num2txt(q.mars.prestige.nasaEngineer.amount)}. `
            document.querySelector(".marsWizzardDisplay").innerHTML = `Wizzard: A magical person who makes money appear out of thin air. His services will cost you PT$${num2txt(q.mars.prestige.wizzard.cost)}. You have ${num2txt(q.mars.prestige.wizzard.amount)} of them.`
            document.querySelector(".marsHackerManDisplay").innerHTML = `Hacker Man: He will hack into bank accounts and steal money. He charges PT$${num2txt(q.mars.prestige.hackerman.cost)}. You have ${num2txt(q.mars.prestige.hackerman.amount)} of them.`
            document.querySelector(".marsArtistDisplay").innerHTML = `Artist: They will paint pictiures of your money and factories. You can hire them for PT$${num2txt(q.mars.prestige.artist.cost)}, and you have ${num2txt(q.mars.prestige.artist.amount)} of them.`
            document.querySelector(".marsBuisnessManagerDisplay").innerHTML = `Buisness Manager: He will take care of everything you have. He is going to cost you PT$${num2txt(q.mars.prestige.buisnessManager.cost)}. You have ${num2txt(q.mars.prestige.buisnessManager.amount)} of them.`

            document.querySelector(".marsMoneyDisplay").innerHTML = `Mars Money: M$${num2txt(q.mars.money)}`
            document.querySelector(".marsColonistsDisplay").innerHTML = `Mars Colonists: Necessary for making money on the mars. You need to keep them alive however. They cost M$${num2txt(q.mars.colonists.cost)} to train, and you have ${num2txt(q.mars.population)}`

            document.querySelector(".marsBuilderDisplay").innerHTML = `Builder: A person who automatically builds factories, reactors, habs, farms, and water makers, so you can sit down and relax. They cost M$${num2txt(q.mars.builder.cost)}! You have ${num2txt(q.mars.builder.amount)}!`
            document.querySelector(".marsManagerDisplay").innerHTML = `Manager: A person who hires builders,engineers,and colonists so you can work hard, or hardly work. They cost M$${num2txt(q.mars.manager.cost)} and you have ${num2txt(q.mars.manager.amount)}!`
            document.querySelector(".marsEngineerDisplay").innerHTML = `Engineer: A person who upgrades factories for you. They are important, if you want to increase profits steadily. They cost M$${num2txt(q.mars.engineer.cost)} and you have ${num2txt(q.mars.engineer.amount)} hires.`
            document.querySelector(".marsSuperManagerDisplay").innerHTML = `Super Manager: An upgraded version of a manager who also hires managers. This makes profits sky rocket. They cost you a ridiculous M$${num2txt(q.mars.superManager.cost)}!!!!!`

            document.querySelector(".marsUpgradeDisplay").innerHTML = `Costs ${num2txt(q.mars.click.cost)} to upgrade. You currently make M$${num2txt(q.mars.click.amount * ef)} per click.`

            document.querySelector(".marsFoodDisplay").innerHTML = `Food: ${num2txt(q.mars.food)}`
            document.querySelector(".marsWaterDisplay").innerHTML = `Water: ${num2txt(q.mars.water)}`
            document.querySelector(".marsEnergyDisplay").innerHTML = `Energy: ${num2txt(q.mars.energy)}`
            document.querySelector(".marsPopulationDisplay").innerHTML = `Population: ${num2txt(q.mars.population)}`


            document.querySelector(".marsAutoPrintMoneyDisplay").innerHTML = `Auto Print: Automatically print money $$$ Costs M$${num2txt(q.mars.autoPrint.cost)} to activate!`
            document.querySelector(".marsAutoUpgradeDisplay").innerHTML = `Auto Upgrade: Automatically upgrades your printer, so you can keep on printing. It costs M$${num2txt(q.mars.autoUpgrade.cost)} to start!`

            document.querySelector(".earthPageDisplay").innerHTML = `Page: ${pages.earthPage}`

            document.querySelector(".earthAutoPlayDisplay").innerHTML = `Auto play: Automatically plays the entire game for you, so you can sit back and relax. It will cost you $${num2txt(q.earth.autoPlay.cost)}! For 60 seconds only!`
            document.querySelector(".earthAutoPrintMoneyDisplay").innerHTML = `Auto print money: This will automatically print money from your printer. It will cost you $${num2txt(q.earth.autoPrint.cost)}! For 60 seconds only!`
            document.querySelector(".earthAutoUpgradeDisplay").innerHTML = `Auto upgrade: Automatically upgrades your printer and factories for you. It will cost you $${num2txt(q.earth.autoUpgrade.cost)}! For 60 seconds only!`
            document.querySelector(".earthTrackerBeamDisplay").innerHTML = `Tracker Beam: A trackers that you can use to track asteroids, and eventually mine them for profits. It costs A$${num2txt(q.asteroid.trackerBeam.cost)}!!`
            document.querySelector(".moonTrackerBeamDisplay").innerHTML = `Tracker Beam: A trackers that you can use to track asteroids, and eventually mine them for profits. It costs A$${num2txt(q.asteroid.trackerBeam.cost)}!!`
            document.querySelector(".marsTrackerBeamDisplay").innerHTML = `Tracker Beam: A trackers that you can use to track asteroids, and eventually mine them for profits. It costs A$${num2txt(q.asteroid.trackerBeam.cost)}!!`

            if (q.asteroid.trackerBeam.purchased) {
                document.querySelector(".earthTrackerBeamBuy").style.display = "none"
                document.querySelector(".moonTrackerBeamBuy").style.display = "none"
                document.querySelector(".marsTrackerBeamBuy").style.display = "none"
            }
            else {
                document.querySelector(".earthTrackerBeamBuy").style.display = "block"
                document.querySelector(".moonTrackerBeamBuy").style.display = "block"
                document.querySelector(".marsTrackerBeamBuy").style.display = "block"
            }



            document.querySelector(".purchaseMoonLabelBest").innerHTML = `
            Money: $${num2txt(q.moon.cost)} <br>
            Prestige Tokens: PT$${num2txt(q.moon.costP)}
            `

            document.querySelector(".purchaseMarsLabelBest").innerHTML = `
            Money: M$${num2txt(q.mars.cost)} <br>
            Prestige Tokens: MPT$${num2txt(q.mars.costP)}
            `


            for (var planet of q.planets) {
                var fill = 0

                if (q[planet].money >= q[planet].prestige.cost) {
                    fill = 100
                }
                else {
                    fill = Math.floor((q[planet].money/q[planet].prestige.cost)*100)
                }

                document.querySelector(`.${planet}PrestigeProgressFill`).style.width = fill + "%"
            }



            var fill = 0

            if (q.earth.money >= q.ascend.cost) {
                fill += 20
            }
            else {
                fill += Math.floor((q.earth.money/q.ascend.cost) * 100)
            }
            if (q.moon.money >= q.ascend.cost) {
                fill += 20
            }
            else {
                fill += Math.floor((q.moon.money/q.ascend.cost) * 100)
            }
            if (q.mars.money >= q.ascend.cost) {
                fill += 20
            }
            else {
                fill += Math.floor((q.mars.money/q.ascend.cost) * 100)
            }

            if (q.earth.prestige.prestigeTokens >= q.ascend.costP) {
                fill += 15
            }
            else {
                fill += Math.floor((q.earth.prestige.prestigeTokens/q.ascend.costP) * 100)
            }
            if (q.moon.prestige.prestigeTokens >= q.ascend.costP) {
                fill += 15
            }
            else {
                fill += Math.floor((q.moon.prestige.prestigeTokens/q.ascend.costP) * 100)
            }
            if (q.mars.prestige.prestigeTokens >= q.ascend.costP) {
                fill += 10
            }
            else {
                fill += Math.floor((q.mars.prestige.prestigeTokens/q.ascend.costP) * 100)
            }


            document.querySelector(".ascendProgressFill").style.width = fill + "%"
        }
        //if asteroids visble
        else {
            for (var upgrade of q.asteroidOreUpgrades) {
                for (var a of q.asteroids) {
                    for (var ore in q.asteroid.asteroids[a]){
                        document.querySelector(`.${a}_${ore}_click`).innerHTML = `$${num2txt(q.asteroid.asteroids[a][ore].value)}`
                        
                        if (q.asteroid.asteroids[a][ore].auto) {
                            var selector = `.${a}automate${capitalizeFirstLetter(ore)}Buy`
                            document.querySelector(selector).style.display = "none"
                        }
                        else {
                            var selector = `.${a}automate${capitalizeFirstLetter(ore)}Buy`
                            document.querySelector(selector).style.display = "block"
                        }
    
                        if (q.asteroid.asteroids[a][ore].unlocked) {
                            var selector = `.${a}research${capitalizeFirstLetter(ore)}Buy`
                            document.querySelector(selector).style.display = "none"
    
                            var selector2 = `#${a}_${capitalizeFirstLetter(ore)}_set`
                            document.querySelector(selector2).style.display = "block"
                        }
                        else {
                            var selector = `.${a}research${capitalizeFirstLetter(ore)}Buy`
                            document.querySelector(selector).style.display = "block"
    
                            var selector2 = `#${a}_${capitalizeFirstLetter(ore)}_set`
                            document.querySelector(selector2).style.display = "none"
                        }
    
                        if (q.asteroid.asteroids[a][ore].upgrades[upgrade].purchased) {
                            var selector = `.t${a}_${ore}_${md5(upgrade)}_buy`
                            document.querySelector(selector).style.display = "none"
                        }
                        else {
                            var selector = `.t${a}_${ore}_${md5(upgrade)}_buy`
                            document.querySelector(selector).style.display = "block"
                        }
                    }
                }
            }
            
            
            document.querySelector(".asteroidMoneyDisplay").innerHTML = `U$: ${num2txt(Math.floor(q.asteroid.money))}`
            document.querySelector(".asteroidResearchDisplay").innerHTML = `R$: ${num2txt(Math.floor(q.asteroid.research))}`
            document.querySelector(".asteroidDisplay").innerHTML = `Asteroid: ${q.asteroids[asteroid-1]}`
    
            for (var n of numbersLessThanN(q.asteroid.maxAsteroids+1)) {
                document.querySelector(`.unlock_${n}_astroids`).style.display = "none"
            }
        }
    }
    catch(err) {
        console.log(err)
        clearInterval(crazyUpdate)
    }
}


function hire(thing,planet="moon") {
    var things = ["builder","manager","engineer","superManager"]




    if (planet != "earth") {
        if ((things.includes(thing) && q[planet].colonists.amount >= 1)) {
            q[planet].colonists.amount -= 1
        }
        else if ((things.includes(thing) && q[planet].colonists.amount < 1)){
            customAlert("You need more colonists!")
            return false
        }

        if (String(thing).includes("mk")) {
            if (q[planet].population < 100) {
                customAlert(`You need ${100-q[planet].population} more people on ${planet} to do this!!!`)
                return false
            }
        }
    }

    if (q[planet].money < q[planet][thing].cost) { customAlert(`You need $${num2txt(q[planet][thing].cost - q[planet].money)} more to do this.`); return false }
    q[planet].money -= q[planet][thing].cost
    q[planet][thing].amount += 1 * (q[planet].prestige.BOGOF.amount + 1) * (q.ascend[planet].BOGOF.amount + 1)


    //if it is on other planets

    if (q[planet][thing].Econsumption != undefined){
        q[planet].Econsumption += q[planet][thing].Econsumption
    }

    if (String(thing).includes("hab")) {
        q[planet].populationCapacity += q[planet][thing].population
    }

}


function hireColonists(p) {
    if (q[p].colonists.amount >= q[p].populationCapacity) {
        customAlert(`You need to build more habs to do this!`)
        return false
    }
    if (q[p].waterProduction < (q[p].population * 5) + 5) {
        customAlert(`You need more water makers to do this!!`)
        return false
    }
    if (q[p].foodProduction < (q[p].population * 5) + 5) {
        customAlert(`You need more farms to do this!!`)
        return false
    }


    if (q[p].money >= q[p].colonists.cost) {
        q[p].money -= q[p].colonists.cost
        q[p].colonists.amount += 1
        q[p].population += 1
    }
    else {
        customAlert(`You need ${q[p].colonists.cost - q[p].money} more ${p+" token(s)"} to do this!`)
    }
}

function prestigeHire(thing,planet) {
    if (q[planet].prestige.prestigeTokens < q[planet].prestige[thing].cost) { customAlert(`You need PT$${num2txt(q[planet].prestige[thing].cost - q[planet].prestige.prestigeTokens)} more to do this.`); return false }
    if (thing == "buisnessManager") {q[planet].prestige.prestigeTokens -= q[planet].prestige[thing].cost; customAlert("lmao bozo you fell for that again!!!"); return false}
    q[planet].prestige.prestigeTokens -= q[planet].prestige[thing].cost
    q[planet].prestige[thing].amount += 1 * (q[planet].prestige.BOGOF.amount + 1) * (q.ascend[planet].BOGOF.amount + 1)
}

function levelUp(thing,planet) {
    if (q[planet].money < q[planet][thing].cost * 10) { customAlert(`You need $${num2txt((q[planet][thing].cost * 10) - q[planet].money)} more to do this.`); return false }
    if (q[planet][thing].level >= 5) {return false }
    q[planet].money -= q[planet][thing].cost * 10
    q[planet][thing].earn *= 2  
    q[planet][thing].level += 1
}

function prestige(p="earth") {
    if (q[p].money < q[p].prestige.cost) {customAlert(`You need $${num2txt(q[p].prestige.cost - q[p].money)} more to do this.`); return false}
    
    customConfirm("Are you sure you want to prestige, this cannot be undone?",() => {
        document.querySelector(`.${p}PrestigeUpgrades`).style.display = "none"
        document.querySelector(`.${p}Upgrades`).style.display = "none"

        pages[p+"Page"] = 1

        var prestigeAmount = Math.floor(Math.log10(q[p].money)) - Math.floor(Math.log10(q[p].prestige.cost)) + 1

        var prestigeStats = q[p].prestige
        q[p] = JSON.parse(JSON.stringify(stock[p]))
        q[p].prestige = prestigeStats

        if (prestigeAmount == 1) {
            q[p].prestige.prestigeTokens += q[p].prestige.tokensAdd.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount
            q[p].prestige.amount += 1
            q[p].prestige.cost *= 10
            $(".game").fadeOut(1000,function() {
                document.querySelector("body").style.backgroundColor = "black"
    
    
                document.querySelector(`.${p}AutoUpgradeBuy`).innerHTML = "buy"
                document.querySelector(`.${p}AutoPrintMoneyBuy`).innerHTML = "buy"
                
                if (q[p].purchased != undefined) {
                    q[p].purchased = true
                }
    
                if (q[p].click.cost / stock[p].click.cost == 1) {
                    for (var i in q[p]) {
                        if (q[p][i] != null && q[p][i].cost != undefined) {
                            q[p][i].cost *= q[difficulty]
                        }
                    }
                    q[p].prestige.cost /= q[difficulty]
                }
    
                //set costs from prestige discount
                for (var i in q[p]) {
                    if (q[p][i] != null && q[p][i].cost != undefined) {
                        // probably to not do prestige upgrades
                        if (q[p][i].prestigeTokens != undefined) {}
                        else {
                            q[p][i].cost = stock[p][i].cost  * q[difficulty] * ((100-q[p].prestige.taxCuts.amount)/100) * ((100-q.ascend[p].taxCuts.amount)/100)
                        }
                    }
                }
    
                clearInterval(intervals[p+"GiveMoney"])
                intervals[p+"GiveMoney"] = setIntervul(function () {
                    for (var i = 0;i < q.ascend[p].atomicPower.amount;i++){
                        q[p].money += q[p].moneyPerSecond * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount
                    }
                }, q[p].prestige.nuclearPower.amount)
    
    
                setTimeout(function() {
                    document.querySelector("body").style.backgroundColor = "white"
                    $(".game").fadeIn(500)
                },1000)
            })
        }
        else {
            text1 = `${prestigeAmount} times`
            text2 = "Just once"
                
            customConfirm(`You can prestige ${prestigeAmount} times, would you like to prestige ${prestigeAmount} times, or just once? WARNING: You wont get any extra tokens for multiple prestiges!`,() => {
                q[p].prestige.prestigeTokens += q[p].prestige.tokensAdd.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount
                q[p].prestige.amount += prestigeAmount
                q[p].prestige.cost *= Math.pow(10,prestigeAmount)
            },() => {
                q[p].prestige.prestigeTokens += q[p].prestige.tokensAdd.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount
                q[p].prestige.amount += 1
                q[p].prestige.cost *= 10
            },() => {
                text1 = `ok`
                text2 = "cancel"

                $(".game").fadeOut(1000,function() {
                    document.querySelector("body").style.backgroundColor = "black"
        
        
                    document.querySelector(`.${p}AutoUpgradeBuy`).innerHTML = "buy"
                    document.querySelector(`.${p}AutoPrintMoneyBuy`).innerHTML = "buy"
                    
                    if (q[p].purchased != undefined) {
                        q[p].purchased = true
                    }
        
                    if (q[p].click.cost / stock[p].click.cost == 1) {
                        for (var i in q[p]) {
                            if (q[p][i] != null && q[p][i].cost != undefined) {
                                q[p][i].cost *= q[difficulty]
                            }
                        }
                        q[p].prestige.cost /= q[difficulty]
                    }
        
                    //set costs from prestige discount
                    for (var i in q[p]) {
                        if (q[p][i] != null && q[p][i].cost != undefined) {
                            // probably to not do prestige upgrades
                            if (q[p][i].prestigeTokens != undefined) {}
                            else {
                                q[p][i].cost = stock[p][i].cost  * q[difficulty] * ((100-q[p].prestige.taxCuts.amount)/100) * ((100-q.ascend[p].taxCuts.amount)/100)
                            }
                        }
                    }
        
                    clearInterval(intervals[p+"GiveMoney"])
                    intervals[p+"GiveMoney"] = setIntervul(function () {
                        for (var i = 0;i < q.ascend[p].atomicPower.amount;i++){
                            q[p].money += q[p].moneyPerSecond * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount
                        }
                    }, q[p].prestige.nuclearPower.amount)
        
        
                    setTimeout(function() {
                        document.querySelector("body").style.backgroundColor = "white"
                        $(".game").fadeIn(500)
                    },1000)
                })
            })
        }
    })
}
function click_asteroid(asteroid_name,ore_name) {
    var ore = q.asteroid.asteroids[asteroid_name][ore_name]
    if (ore.clicked == false) {
        ore.clicked = true
    }
}


var visibility = ["0px","-25%"]


var x = 0
function toggle() {
    document.querySelector(".menu").style.right = visibility[x]
    
    if (x == 0) {x = 1}
    else if (x == 1) {x = 0}
}

document.querySelector(".toggleMenu").onclick = () => {
    toggle()
    document.querySelector(".moreResearch").style.display = "none"
    document.querySelector(".asteroidResearch").style.display = "none"
    document.querySelector(".oreResearch").style.display = "none"
    document.querySelector(".upgrades").style.display = "none"
    document.querySelector(".automations").style.display = "none"
}

function canAscend() {
    if (q.earth.money < q.ascend.cost) {return false}
    if (q.moon.money < q.ascend.cost) {return false}
    if (q.mars.money < q.ascend.cost) {return false}
    if (q.earth.prestige.prestigeTokens < q.ascend.costP) {return false}
    if (q.moon.prestige.prestigeTokens < q.ascend.costP) {return false}
    if (q.mars.prestige.prestigeTokens < q.ascend.costP) {return false}
    
    return true
}

function numbersLessThanN(n) {
    var result = [];
    for (var i = 2; i < n; i++) {
      result.push(i);
    }
    return result;
  }
  

function ascend() {
    if (q.earth.money < q.ascend.cost) {customAlert(`You need $${num2txt(q.ascend.cost - q.earth.money)} more earth money to do this!`); return false}
    if (q.moon.money < q.ascend.cost) {customAlert(`You need $${num2txt(q.ascend.cost - q.moon.money)} more moon money to do this!`); return false}
    if (q.mars.money < q.ascend.cost) {customAlert(`You need $${num2txt(q.ascend.cost - q.mars.money)} more mars money to do this!`); return false}
    if (q.earth.prestige.prestigeTokens < q.ascend.costP) {customAlert(`You need PT$${num2txt(q.ascend.costP - q.earth.prestige.prestigeTokens)} more earth prestige tokens to do this!`); return false}
    if (q.moon.prestige.prestigeTokens < q.ascend.costP) {customAlert(`You need PT$${num2txt(q.ascend.costP - q.moon.prestige.prestigeTokens)} more moon money to do this!`); return false}
    if (q.mars.prestige.prestigeTokens < q.ascend.costP) {customAlert(`You need PT$${num2txt(q.ascend.costP - q.mars.prestige.prestigeTokens)} more mars money to do this!`); return false}


    $(".game").fadeOut(1000,function() {
        var ascendStats = JSON.parse(JSON.stringify(q.ascend))

        q = JSON.parse(JSON.stringify(stock))

        q.ascend = ascendStats

        q.ascend.cost *= 10

        q.ascend.amount += 1

        q.ascend.tokens += q.ascend.earth.multiplier.amount + q.ascend.moon.multiplier.amount + q.ascend.mars.multiplier.amount

        planet = 0


        for (var p of q.planets) {
            clearInterval(intervals[p+"GiveMoney"])
            intervals[p+"GiveMoney"] = setIntervul(function () {
                for (var i = 0;i < q.ascend[p].atomicPower.amount;i++){
                    q[p].money += q[p].moneyPerSecond * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount
                }
            }, q[p].prestige.nuclearPower.amount)
    
            if (q[p].click.cost / stock[p].click.cost == 1) {
                for (var i in q[p]) {
                    if (q[p][i] != null && q[p][i].cost != undefined) {
                        q[p][i].cost *= q[difficulty]
                    }
                }
                q[p].prestige.cost /= q[difficulty]
            }
    
            q[p].autoPrint.on = false
            q[p].autoUpgrade.on = false
    
            document.querySelector(`.${p}AutoUpgradeBuy`).innerHTML = "buy"
            document.querySelector(`.${p}AutoPrintMoneyBuy`).innerHTML = "buy"
    
            document.querySelector(`.${p}PrestigeUpgrades`).style.display = "none"
            document.querySelector(`.${p}Upgrades`).style.display = "none"
    
            pages[p+"Page"] = 1
        }
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white"
            $(".game").fadeIn(500)
        },1000)
    })
}


// function save() {
//     if (gameLoaded){  
//         var usr = JSON.parse(localStorage.getItem("loggedInUserData")).usr
//         var password = JSON.parse(localStorage.getItem("loggedInUserData")).password

//         var data = {
//             usr: usr,
//             password: password,
//             difficulty: difficulty,
//             save: q
//         }


        
//         fetch(`${window.location.href}`,{
//             method: "POST",
//             credentials: "include",
//             body: `CLOUDSAVE:${JSON.stringify(data)}`,
//             cache: "no-cache",
//             headers: new Headers({
//                 "content-type": "application/json"
//             })
//         })
//     }
// }

// function load() {
//     var usr = JSON.parse(localStorage.getItem("loggedInUserData")).usr
//     fetch("https://clockmannevertoldtime.pythonanywhere.com/cloudSaves?user=" + usr).then( save => save.json() ).then( save => {
//         if (save != "error" && Object.keys(save[difficulty]).length != 0){
//             deepMerge(q,save[difficulty])
//             q.earth.factories = JSON.parse(JSON.stringify(stock.earth.factories))
//             q.earth.factories = JSON.parse(JSON.stringify(stock.earth.factories))
//             q.earth.autoUpgrade = {on: false, cost: 10000 * q[difficulty]}
//             q.moon.autoPrint = {on: false, cost: 100000 * q[difficulty]}
//             q.moon.autoUpgrade = {on: false, cost: 10000 * q[difficulty]}
//             q.mars.autoPrint = {on: false, cost: 100000 * q[difficulty]}
//             q.mars.autoUpgrade = {on: false, cost: 10000 * q[difficulty]}
//             q.earth.autoPrint = {on: false, cost: 100000 * q[difficulty]}
//         }
//     })
//     setIntervul(function () { save() }, 1000)
// }

function save() {
    localStorage.setItem("data"+difficulty, JSON.stringify(q))
}

function load() {
    var data = JSON.parse(localStorage.getItem("data"+difficulty))
    deepMerge(q,data)
    q.earth.factories = JSON.parse(JSON.stringify(stock.earth.factories))
    q.earth.autoUpgrade = {on: false, cost: 10000 * q[difficulty]}
    q.moon.autoPrint = {on: false, cost: 100000 * q[difficulty]}
    q.moon.autoUpgrade = {on: false, cost: 10000 * q[difficulty]}
    q.mars.autoPrint = {on: false, cost: 100000 * q[difficulty]}
    q.mars.autoUpgrade = {on: false, cost: 10000 * q[difficulty]}
    q.earth.autoPrint = {on: false, cost: 100000 * q[difficulty]}

    setIntervul(function () { save() }, 1000)
}

function reset() {
    q = JSON.parse(JSON.stringify(stock))
    save()
    setDifficulty(difficulty)
    for (i of q.planets) {
        pages[i+"Page"] = 1
    }
    planet = 0

    document.querySelector(`.earthUpgrades`).style.display = "none"
    document.querySelector(`.earthPrestigeUpgrades`).style.display = "none"
    document.querySelector(`.earthAscentionUpgrades`).style.display = "none"

    document.querySelector(".asteroids > .asteroids").innerHTML = ""

    asteroid = 0

}

function customAlert(message) {
    try {
        document.querySelector(".message").innerHTML = message
        document.querySelector(".alert").showModal()
    }
    catch(err) {
        console.log(err)
    }
}


var text1 = "ok"
var text2 = "cancel"

function customConfirm(message,yes,no = () => {},after = () => {}) {
    try {
        document.querySelector(".ok").innerHTML = text1
        document.querySelector(".cancel").innerHTML = text2

        document.querySelector(".question").innerHTML = message
        document.querySelector(".confirm").showModal()

        document.querySelector(".ok").onclick = () => {
            document.querySelector(".confirm").close()

            document.querySelector(".ok").onclick = () => {}

            yes()
            after()
        }

        document.querySelector(".cancel").onclick = () => {
            document.querySelector(".confirm").close()
            document.querySelector(".cancel").onclick = () => {}

            no()
            after()
        }

    }
    catch(err) {
        console.log(err)
    }
}


function startGame() {
    load()
    for (var p of q.planets) {
        q[p].autoPrint.on = false
        q[p].autoUpgrade.on = false

        if (q[p].click.cost / stock[p].click.cost == 1) {
            for (var i in q[p]) {
                if (q[p][i] != null && q[p][i].cost != undefined) {
                    q[p][i].cost *= q[difficulty]
                }
            }
        }
        document.querySelector(`.${p}`).style.display = "none"
    }

    for (var asteroid of q.asteroids) {
        loadAsteroidHtml(asteroid)
    }

    document.querySelector(`.earth`).style.display = "block"

    clearInterval(intervals[`earthGiveMoney`])
    intervals[`earthGiveMoney`] = setIntervul(function () {
        for (var i = 0;i < q.ascend.earth.atomicPower.amount;i++){
            q.earth.money += q.earth.moneyPerSecond * q.earth.prestige.multiplier.amount * q.ascend.earth.multiplier.amount
        }
    }, q.earth.prestige.nuclearPower.amount)
    
}


function asteroidsVisible() {
    if (asteroid == 0) {
        return false
    }
    else {
        return true
    }
}
    
function getRandomNumber(min, max) {
    const random = Math.random();
    const scaled = random * (max - min);
    const result = scaled + min;
    return result;
}

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characters2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';

    const randomIndex = Math.floor(Math.random() * characters2.length);
    randomString += characters2.charAt(randomIndex);

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

function deepMerge(obj1, obj2) {
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        if (typeof obj2[key] === 'object' && obj2[key] !== null) {
          if (!obj1[key] || typeof obj1[key] !== 'object') {
            obj1[key] = {};
          }
          deepMerge(obj1[key], obj2[key]);
        } else {
          obj1[key] = obj2[key];
        }
      }
    }
  }

function prestigeUpgrade(upgrade,planet) {
    if (q[planet].prestige.prestigeTokens < q[planet].prestige[upgrade].cost) {
        customAlert(`You need P$${q[planet].prestige[upgrade].cost - q[planet].prestige.prestigeTokens} more to do this!`)
        return false
    }

    if (q[planet].prestige[upgrade].level < q[planet].prestige[upgrade].max) {
        q[planet].prestige[upgrade].amount += q[planet].prestige[upgrade].add
        q[planet].prestige[upgrade].level += 1
        q[planet].prestige.prestigeTokens -= q[planet].prestige[upgrade].cost
        q[planet].prestige[upgrade].cost = Math.floor(1.5**(q[planet].prestige[upgrade].level +1))
    }

    if (q[planet].prestige.tokensAdd.amount ==  1) {
        q[planet].prestige.tokensAdd.add = 2
    }
    if (q[planet].prestige.tokensAdd.amount ==  2) {
        q[planet].prestige.tokensAdd.add = 4
    }
    if (q[planet].prestige.tokensAdd.amount >=  3) {
        q[planet].prestige.tokensAdd.add = 10
    }
    if (q[planet].prestige.tokensAdd.amouxnt >=  10) {
        q[planet].prestige.tokensAdd.add = 100
    }


    for (var i in q[planet]) {
        if (q[planet][i] != null && q[planet][i].cost != undefined) {
            // probably to not do prestige upgrades
            if (q[planet][i].cost != undefined && i != "prestige") {
                q[planet][i].cost = stock[planet][i].cost  * q[difficulty] * ((100-q[planet].prestige.taxCuts.amount)/100) * ((100-q.ascend[planet].taxCuts.amount)/100)
            }
        }
    }

    

    clearInterval(intervals[planet+"GiveMoney"])
    intervals[planet+"GiveMoney"] = setIntervul(function () {
        for (var i = 0;i < q.ascend[planet].atomicPower.amount;i++){
            q[planet].money += q[planet].moneyPerSecond * q[planet].prestige.multiplier.amount * q.ascend[planet].multiplier.amount
        }
    }, q[planet].prestige.nuclearPower.amount)
}

function ascentionUpgrade(upgrade,planet) {
    if (q.ascend.tokens >= q.ascend[planet][upgrade].cost) {
        if (q.ascend[planet][upgrade].level < q.ascend[planet][upgrade].max) {
            q.ascend[planet][upgrade].amount += q.ascend[planet][upgrade].add
            q.ascend[planet][upgrade].level += 1
            q.ascend.tokens -= q.ascend[planet][upgrade].cost
            q.ascend[planet][upgrade].cost = Math.floor(10*(q.ascend[planet][upgrade].level +1))
        }
    }
    else {
        customAlert(`You need ${q.ascend[planet][upgrade].cost - q.ascend.tokens} more tokens to do this!!!`)
    }

    for (var i in q[planet]) {
        if (q[planet][i] != null && q[planet][i].cost != undefined) {
            if (q[planet][i].cost != undefined && i != "prestige") {
                q[planet][i].cost = stock[planet][i].cost  * q[difficulty] * ((100-q[planet].prestige.taxCuts.amount)/100) * ((100-q.ascend[planet].taxCuts.amount)/100)
            }
        }
    }
}

function ascentionHire(upgrade,planet) {
    if (q.ascend.tokens >= q.ascend[planet][upgrade].cost) {
        q.ascend[planet][upgrade].amount += 1 + q.ascend[planet].BOGOF.amount
        q.ascend.tokens -= q.ascend[planet][upgrade].cost
    }
    else {
        customAlert(`You need ${q.ascend[planet][upgrade].cost - q.ascend.tokens} more tokens to do this!!!`)
    }
}




}

/*Intervals*/{



var crazyUpdate = setIntervul(function () {
    update()
}, 1)


//10ms
setIntervul(function(){
    for (var p of q.planets) {
        if (q[p].money >= q[p].click.cost && q[p].autoUpgrade.on) {
            for (var i = 0; i < q.ascend[p].autoUpgradeStack.amount; i++) {
                upgrade(p, false);
            }
        }

        if (q[p].autoPrint.on) {
            for (var i = 0; i < q.ascend[p].autoPrintStack.amount; i++) {
                q[p].money += q[p].click.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount;
            }
        }
    }
}, 10);


//5 min
setIntervul(function(){
    for (var p of q.planets) {
        if (q[p].superManager.amount >= 1) {
            if (q[p].money > q[p].manager.cost) {
                var manager = Math.floor(q[p].money / q[p].manager.cost);
    
                if (manager > q[p].superManager.amount) {
                    manager = q[p].superManager.amount;
                }
    
                var cost = manager * q[p].manager.cost;
                q[p].money -= cost;
                q[p].manager.amount += manager * (q[p].prestige.BOGOF.amount + 1) * (q.ascend[p].BOGOF.amount + 1);
            }
    
            if (q[p].money > q[p].builder.cost) {
                var builder = Math.floor(q[p].money / q[p].builder.cost);
    
                if (builder > q[p].superManager.amount) {
                    builder = q[p].superManager.amount;
                }
    
                var cost = builder * q[p].builder.cost;
                q[p].money -= cost;
                q[p].builder.amount += builder * (q[p].prestige.BOGOF.amount + 1) * (q.ascend[p].BOGOF.amount + 1);
            }
    
            if (q[p].money > q[p].engineer.cost) {
                var engineer = Math.floor(q[p].money / q[p].engineer.cost);
    
                if (engineer > q[p].superManager.amount) {
                    engineer = q[p].superManager.amount;
                }
    
                var cost = engineer * q[p].engineer.cost;
                q[p].money -= cost;
                q[p].engineer.amount += engineer * (q[p].prestige.BOGOF.amount + 1) * (q.ascend[p].BOGOF.amount + 1);
            }
        }
    }
}, 300000);


//60 sec
setIntervul(function() {
    for (var p of q.planets) {
        if (q[p].manager.amount >= 1) {

            if (q[p].money > q[p].builder.cost) {
                var builder = Math.floor(q[p].money / q[p].builder.cost);

                if (builder > q[p].manager.amount) {
                    builder = q[p].manager.amount;
                }

                var cost = builder * q[p].builder.cost;

                q[p].money -= cost;
                q[p].builder.amount += builder * (q[p].prestige.BOGOF.amount + 1) * (q.ascend[p].BOGOF.amount + 1);
            }

            if (q[p].money > q[p].engineer.cost) {
                var engineer = Math.floor(q[p].money / q[p].engineer.cost);

                if (engineer > q[p].manager.amount) {
                    engineer = q[p].manager.amount;
                }

                var cost = engineer * q[p].engineer.cost;

                q[p].money -= cost;
                q[p].engineer.amount += engineer * (q[p].prestige.BOGOF.amount + 1) * (q.ascend[p].BOGOF.amount + 1);
            }
        }

        if (q[p].engineer.amount >= 1) {
            for (const iterator of q[p].factories) {
                if (q[p][iterator].amount >= 1) {
                    q[p][iterator].earn = Math.floor(q[p][iterator].earn + ((q[p].engineer.amount) / 1000));
                    q[p][iterator].cost = Math.floor(q[p][iterator].cost + ((q[p].engineer.amount) / 500));
                }
            }
        }

        if (q[p].prestige.nasaEngineer.amount >= 1) {
            for (const iterator of q[p].factories) {
                if (q[p][iterator].amount >= 1) {
                    q[p][iterator].earn = Math.floor(q[p][iterator].earn + ((q[p].prestige.nasaEngineer.amount) / 500));
                }
            }
        }

        if (q[p].prestige.artist.amount >= 1) {
            q[p].money += (Math.floor(q[p].prestige.cost / 500000000)) * q[p].prestige.artist.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount;
        }
    }
}, 60000);


//15 sec
setIntervul(function() {
    for (var p of q.planets) {
        if (q[p].builder.amount >= 1) {
            q[p].factories.reduceRight((_, elem) => {
                if (elem != undefined) {
                    if (q[p].money > q[p][elem].cost) {
                        var ek = Math.floor(q[p].money / q[p][elem].cost);

                        if (ek > q[p].builder.amount) {
                            ek = q[p].builder.amount;
                        }

                        var cost = ek * q[p][elem].cost;
                        q[p].money -= cost;
                        q[p][elem].amount += ek * (q[p].prestige.BOGOF.amount + 1) * (q.ascend[p].BOGOF.amount + 1);
                    }
                }
            }, null);
        }
    }
}, 15000);


//2 minute
setIntervul(function() {
    for (var p of q.planets) {
        q[p].money += (Math.floor(q[p].prestige.cost / 0.5)) * q.ascend[p].Enchanter.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount;
        q[p].money += (Math.floor(q[p].prestige.cost / 1)) * q.ascend[p].roguewizzard.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount;
        q[p].money += (Math.floor(q[p].prestige.cost / 2)) * q.ascend[p].shadowHacker.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount;
        q[p].money += (Math.floor(q[p].prestige.cost / 4)) * q.ascend[p].technomancer.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount;
        q[p].money += (Math.floor(q[p].prestige.cost / 5)) * q.ascend[p].arcaneScholar.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount;

        if (q[p].prestige.wizzard.amount >= 1) {
            q[p].money += (Math.floor(q[p].prestige.cost / 10)) * q[p].prestige.wizzard.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount;
        }

        if (q[p].prestige.hackerman.amount >= 1) {
            q[p].money += (Math.floor(q[p].prestige.cost / 500)) * q[p].prestige.hackerman.amount * q[p].prestige.multiplier.amount * q.ascend[p].multiplier.amount;
        }
    }
}, 120000);



setIntervul(function() {
if (q.moon.purchased) {

    let reactors = q.moon.reactors;
    var totalEnergy = 0;
    for (let i = 0; i < reactors.length; i++) {
        totalEnergy += q.moon[reactors[i]].produce * q.moon[reactors[i]].amount
    }
    q.moon.energy += totalEnergy;

    let things = q.moon.things;
    var totalEnergy = 0;

    for (let i = 0; i < things.length; i++) {
        if (q.moon[things[i]].amount > 0) {
            totalEnergy += q.moon[things[i]].Econsumption * q.moon[things[i]].amount;
        }
    }

    if (q.moon.energy - totalEnergy >= 0) {
        q.moon.energy -= totalEnergy
    }
    else {
        customAlert("not enough energy on the Moon")
        return false
    }



    

    let waterMakers = q.moon.waterMakers;
    let totalWater = 0;
    

    for (let i = 0; i < waterMakers.length; i++) {
        totalWater += q.moon[waterMakers[i]].produce * q.moon[waterMakers[i]].amount;
    }

    q.moon.water += totalWater
    q.moon.waterProduction = totalWater

    var farms = q.moon.farms
    var totalFood = 0
    var waterConsumed = 0
    for (let i = 0; i < farms.length; i++) {
        totalFood += q.moon[farms[i]].produce * q.moon[farms[i]].amount;
        waterConsumed += q.moon[farms[i]].produce * q.moon[farms[i]].amount;
    }

    if (waterConsumed > q.moon.water) {
        customAlert("not enough water to make food on the Moon")
    }

    else {
        q.moon.water -= waterConsumed
        q.moon.food += totalFood
        q.moon.foodProduction = totalFood
    }
}
},5000)

setIntervul(function() {
if (q.mars.purchased) {

    let reactors = q.mars.reactors;
    var totalEnergy = 0;
    for (let i = 0; i < reactors.length; i++) {
        totalEnergy += q.mars[reactors[i]].produce * q.mars[reactors[i]].amount
    }
    q.mars.energy += totalEnergy;

    let things = q.mars.things;
    var totalEnergy = 0;

    for (let i = 0; i < things.length; i++) {
        if (q.mars[things[i]].amount > 0) {
            totalEnergy += q.mars[things[i]].Econsumption * q.mars[things[i]].amount;
        }
    }

    if (q.mars.energy - totalEnergy >= 0) {
        q.mars.energy -= totalEnergy
    }
    else {
        customAlert("Not enough energy on Mars")
        return false
    }


    

    let waterMakers = q.mars.waterMakers;
    let totalWater = 0;
    

    for (let i = 0; i < waterMakers.length; i++) {
        totalWater += q.mars[waterMakers[i]].produce * q.mars[waterMakers[i]].amount;
    }

    q.mars.waterProduction = totalWater
    q.mars.water += totalWater

    var farms = q.mars.farms
    var totalFood = 0
    var waterConsumed = 0
    for (let i = 0; i < farms.length; i++) {
        totalFood += q.mars[farms[i]].produce * q.mars[farms[i]].amount;
        waterConsumed += q.mars[farms[i]].produce * q.mars[farms[i]].amount;
    }

    if (waterConsumed > q.mars.water) {
        customAlert("Not enough water on Mars to make food!")
    }

    else {
        q.mars.water -= waterConsumed
        q.mars.food += totalFood
        q.mars.foodProduction = totalFood
    }


}
},5000)






setIntervul(function(){
    for (var a of q.asteroids) {
        for (var ore of q.asteroidOres) {
            if (q.asteroid.asteroids[a][ore].auto) {
                document.querySelector(`.${a}_${capitalizeFirstLetter(ore)}_give`).click()
            }
        }
    }
},100)



setIntervul(function(){

    for(var a of q.asteroids) {
        for (var o of q.asteroidOres) {
            var ore = q.asteroid.asteroids[a][o]

            if (ore.clicked == false) {continue}

            var t = Math.floor(ore.time)
            ore.timePassed += 500

            width = Math.floor((ore.timePassed/ore.time)*100)
            ore.progress = width



            //just for preformance
            if (a == q.asteroids[asteroid-1]) {
                document.querySelector("."+a+"_"+o+"_fill").style.width = width+"%"
            }

            if (ore.timePassed >= t + 100) {
                ore.timePassed = 0
                ore.clicked = false
                q.asteroid.money += ore.value
                q.asteroid.research += 50
                document.querySelector("."+a+"_"+o+"_fill").style.width = "0%"
            } 
        }
    }
},500)




}

/*Button onclicks*/{
document.querySelector(".earthPrintMoney").onclick = function() {giveMoney("earth")}
document.querySelector(".earthUpgradePrinter").onclick = function () { upgrade() }
document.querySelector(".earthAutoUpgradeBuy").onclick = function () { autoUpgrade("earth") }
document.querySelector(".earthAutoPrintMoneyBuy").onclick = function () { autoPrintMoney("earth") }
document.querySelector(".earthAutoPlayBuy").onclick = function () { autoPlay() }

document.querySelector(".earthBuyMoreMoney").onclick = function() {prestigeUpgrade("multiplier","earth")}
document.querySelector(".earthBuyMoreTokens").onclick = function() {prestigeUpgrade("tokensAdd","earth")}
document.querySelector(".earthBuyNuclearFactories").onclick = function() {prestigeUpgrade("nuclearPower","earth")}
document.querySelector(".earthBuyTaxCuts").onclick = function() {prestigeUpgrade("taxCuts","earth")}
document.querySelector(".earthBuyBuyOneGetOneFree").onclick = function() {prestigeUpgrade("BOGOF","earth")}
document.querySelector(".earthHireBuilder").onclick = function () { hire("builder","earth") }
document.querySelector(".earthHireManager").onclick = function () { hire("manager","earth") }
document.querySelector(".earthHireSuperManager").onclick = function () { hire("superManager","earth") }
document.querySelector(".earthHireEngineer").onclick = function () { hire("engineer","earth") }

document.querySelector(".earthHireWizzard").onclick = function () { prestigeHire("wizzard","earth") }
document.querySelector(".earthHireHackerMan").onclick = function () { prestigeHire("hackerman","earth") }
document.querySelector(".earthHireArtist").onclick = function () { prestigeHire("artist","earth") }
document.querySelector(".earthHireNasaEngineer").onclick = function () { prestigeHire("nasaEngineer","earth") }
document.querySelector(".earthHireBuisnessManager").onclick = function () { prestigeHire("buisnessManager","earth") }


document.querySelector(".earthPrestigeButton").onclick = function () { prestige("earth") }
document.querySelector(".startGame").onclick = function () { start() }
document.querySelector(".easy").onclick = function () {setDifficulty(`easy`,true) }
document.querySelector(".medium").onclick = function () { setDifficulty(`medium`, true) }
document.querySelector(".hard").onclick = function () { setDifficulty(`hard`,true) }
document.querySelector(".insane").onclick = function () { setDifficulty(`insane`, true) }
document.querySelector(".impossible").onclick = function () {setDifficulty(`impossible`,true) }

function toggleMenuVisibility(selector,planet) {
    const style = document.querySelector(selector).style.display

    document.querySelector(`.${planet}Upgrades`).style.display = "none"
    document.querySelector(`.${planet}PrestigeUpgrades`).style.display = "none"
    document.querySelector(`.${planet}AscentionUpgrades`).style.display = "none"

    menuOpened = selector

    if (style == "block") {
        document.querySelector(selector).style.display = "none"
        menuOpen = false
    }
    else {
        document.querySelector(selector).style.display = "block"
        menuOpen = true
    }
}

function toggleAsteroidMenuVisibility(selector){
    const style = document.querySelector(selector).style.display

    document.querySelector(".moreResearch").style.display = "none"
    document.querySelector(".asteroidResearch").style.display = "none"
    document.querySelector(".oreResearch").style.display = "none"
    document.querySelector(".upgrades").style.display = "none"
    document.querySelector(".automations").style.display = "none"
    document.querySelector(".asteroidBelts").style.display = "none"

    if (style == "block") {
        document.querySelector(selector).style.display = "none"
    }
    else {
        document.querySelector(selector).style.display = "block"
    }
}


document.querySelector(".earthUpgradeButton").onclick = () => {
    toggleMenuVisibility(".earthUpgrades","earth")
}

document.querySelector(".earthPrestigeUpgradesButton").onclick = () => {
    toggleMenuVisibility(".earthPrestigeUpgrades","earth")
}

document.querySelector(".earthUp").onclick = () => {
    pages.earthPage += 1
}

document.querySelector(".earthDown").onclick = () => {
    if (pages.earthPage > 1) {
        pages.earthPage -= 1
    }
}


document.querySelector(".earthAscentionUp").onclick = () => {
    pages.earthAscentionPage += 1
}

document.querySelector(".earthAscentionDown").onclick = () => {
    if (pages.earthAscentionPage > 1) {
        pages.earthAscentionPage -= 1
    }
}



document.querySelector(".close").onclick = () => {
    document.querySelector(".alert").close()
}

document.querySelector(".earthAscentionUpgradesButton").onclick = () => {
    toggleMenuVisibility(".earthAscentionUpgrades", "earth")
}


document.querySelector(".earthEarthAscentionMultiplierBuy").onclick = () => {ascentionUpgrade("multiplier","earth")}
document.querySelector(".earthEarthAutoPrintStackBuy").onclick = () => {ascentionUpgrade("autoPrintStack","earth")}
document.querySelector(".earthEarthAutoUpgradeStackBuy").onclick = () => {ascentionUpgrade("autoUpgradeStack","earth")}
document.querySelector(".earthEarthAtomicPowerBuy").onclick = () => {ascentionUpgrade("atomicPower","earth")}
document.querySelector(".earthEarthAscentionTaxCutsBuy").onclick = () => {ascentionUpgrade("taxCuts","earth")}
document.querySelector(".earthEarthAscentionBOGOFBuy").onclick = () => {ascentionUpgrade("BOGOF","earth")}

document.querySelector(".earthEartharcaneScholarBuy").onclick = () => {ascentionHire("arcaneScholar","earth")}
document.querySelector(".earthEarthtechnomancerBuy").onclick = () => {ascentionHire("technomancer","earth")}
document.querySelector(".earthEarthshadowHackerBuy").onclick = () => {ascentionHire("shadowHacker","earth")}
document.querySelector(".earthEarthroguewizzardBuy").onclick = () => {ascentionHire("roguewizzard","earth")}
document.querySelector(".earthEarthEnchanterBuy").onclick = () => {ascentionHire("Enchanter","earth")}

document.querySelector(".earthMoonAscentionMultiplierBuy").onclick = () => {ascentionUpgrade("multiplier","moon")}
document.querySelector(".earthMoonAutoPrintStackBuy").onclick = () => {ascentionUpgrade("autoPrintStack","moon")}
document.querySelector(".earthMoonAutoUpgradeStackBuy").onclick = () => {ascentionUpgrade("autoUpgradeStack","moon")}
document.querySelector(".earthMoonAtomicPowerBuy").onclick = () => {ascentionUpgrade("atomicPower","moon")}
document.querySelector(".earthMoonAscentionTaxCutsBuy").onclick = () => {ascentionUpgrade("taxCuts","moon")}
document.querySelector(".earthMoonAscentionBOGOFBuy").onclick = () => {ascentionUpgrade("BOGOF","moon")}

document.querySelector(".earthMoonarcaneScholarBuy").onclick = () => {ascentionHire("arcaneScholar","moon")}
document.querySelector(".earthMoontechnomancerBuy").onclick = () => {ascentionHire("technomancer","moon")}
document.querySelector(".earthMoonshadowHackerBuy").onclick = () => {ascentionHire("shadowHacker","moon")}
document.querySelector(".earthMoonroguewizzardBuy").onclick = () => {ascentionHire("roguewizzard","moon")}
document.querySelector(".earthMoonEnchanterBuy").onclick = () => {ascentionHire("Enchanter","moon")}

document.querySelector(".earthMarsAscentionMultiplierBuy").onclick = () => {ascentionUpgrade("multiplier","mars")}
document.querySelector(".earthMarsAutoPrintStackBuy").onclick = () => {ascentionUpgrade("autoPrintStack","mars")}
document.querySelector(".earthMarsAutoUpgradeStackBuy").onclick = () => {ascentionUpgrade("autoUpgradeStack","mars")}
document.querySelector(".earthMarsAtomicPowerBuy").onclick = () => {ascentionUpgrade("atomicPower","mars")}
document.querySelector(".earthMarsAscentionTaxCutsBuy").onclick = () => {ascentionUpgrade("taxCuts","mars")}
document.querySelector(".earthMarsAscentionBOGOFBuy").onclick = () => {ascentionUpgrade("BOGOF","mars")}

document.querySelector(".earthMarsarcaneScholarBuy").onclick = () => {ascentionHire("arcaneScholar","mars")}
document.querySelector(".earthMarstechnomancerBuy").onclick = () => {ascentionHire("technomancer","mars")}
document.querySelector(".earthMarsshadowHackerBuy").onclick = () => {ascentionHire("shadowHacker","mars")}
document.querySelector(".earthMarsroguewizzardBuy").onclick = () => {ascentionHire("roguewizzard","mars")}
document.querySelector(".earthMarsEnchanterBuy").onclick = () => {ascentionHire("Enchanter","mars")}

document.querySelector(".moonEarthAscentionMultiplierBuy").onclick = () => {ascentionUpgrade("multiplier","earth")}
document.querySelector(".moonEarthAutoPrintStackBuy").onclick = () => {ascentionUpgrade("autoPrintStack","earth")}
document.querySelector(".moonEarthAutoUpgradeStackBuy").onclick = () => {ascentionUpgrade("autoUpgradeStack","earth")}
document.querySelector(".moonEarthAtomicPowerBuy").onclick = () => {ascentionUpgrade("atomicPower","earth")}
document.querySelector(".moonEarthAscentionTaxCutsBuy").onclick = () => {ascentionUpgrade("taxCuts","earth")}
document.querySelector(".moonEarthAscentionBOGOFBuy").onclick = () => {ascentionUpgrade("BOGOF","earth")}

document.querySelector(".moonEartharcaneScholarBuy").onclick = () => {ascentionHire("arcaneScholar","earth")}
document.querySelector(".moonEarthtechnomancerBuy").onclick = () => {ascentionHire("technomancer","earth")}
document.querySelector(".moonEarthshadowHackerBuy").onclick = () => {ascentionHire("shadowHacker","earth")}
document.querySelector(".moonEarthroguewizzardBuy").onclick = () => {ascentionHire("roguewizzard","earth")}
document.querySelector(".moonEarthEnchanterBuy").onclick = () => {ascentionHire("Enchanter","earth")}

document.querySelector(".moonMoonAscentionMultiplierBuy").onclick = () => {ascentionUpgrade("multiplier","moon")}
document.querySelector(".moonMoonAutoPrintStackBuy").onclick = () => {ascentionUpgrade("autoPrintStack","moon")}
document.querySelector(".moonMoonAutoUpgradeStackBuy").onclick = () => {ascentionUpgrade("autoUpgradeStack","moon")}
document.querySelector(".moonMoonAtomicPowerBuy").onclick = () => {ascentionUpgrade("atomicPower","moon")}
document.querySelector(".moonMoonAscentionTaxCutsBuy").onclick = () => {ascentionUpgrade("taxCuts","moon")}
document.querySelector(".moonMoonAscentionBOGOFBuy").onclick = () => {ascentionUpgrade("BOGOF","moon")}

document.querySelector(".moonMoonarcaneScholarBuy").onclick = () => {ascentionHire("arcaneScholar","moon")}
document.querySelector(".moonMoontechnomancerBuy").onclick = () => {ascentionHire("technomancer","moon")}
document.querySelector(".moonMoonshadowHackerBuy").onclick = () => {ascentionHire("shadowHacker","moon")}
document.querySelector(".moonMoonroguewizzardBuy").onclick = () => {ascentionHire("roguewizzard","moon")}
document.querySelector(".moonMoonEnchanterBuy").onclick = () => {ascentionHire("Enchanter","moon")}

document.querySelector(".moonMarsAscentionMultiplierBuy").onclick = () => {ascentionUpgrade("multiplier","mars")}
document.querySelector(".moonMarsAutoPrintStackBuy").onclick = () => {ascentionUpgrade("autoPrintStack","mars")}
document.querySelector(".moonMarsAutoUpgradeStackBuy").onclick = () => {ascentionUpgrade("autoUpgradeStack","mars")}
document.querySelector(".moonMarsAtomicPowerBuy").onclick = () => {ascentionUpgrade("atomicPower","mars")}
document.querySelector(".moonMarsAscentionTaxCutsBuy").onclick = () => {ascentionUpgrade("taxCuts","mars")}
document.querySelector(".moonMarsAscentionBOGOFBuy").onclick = () => {ascentionUpgrade("BOGOF","mars")}

document.querySelector(".moonMarsarcaneScholarBuy").onclick = () => {ascentionHire("arcaneScholar","mars")}
document.querySelector(".moonMarstechnomancerBuy").onclick = () => {ascentionHire("technomancer","mars")}
document.querySelector(".moonMarsshadowHackerBuy").onclick = () => {ascentionHire("shadowHacker","mars")}
document.querySelector(".moonMarsroguewizzardBuy").onclick = () => {ascentionHire("roguewizzard","mars")}
document.querySelector(".moonMarsEnchanterBuy").onclick = () => {ascentionHire("Enchanter","mars")}

document.querySelector(".marsEarthAscentionMultiplierBuy").onclick = () => {ascentionUpgrade("multiplier","earth")}
document.querySelector(".marsEarthAutoPrintStackBuy").onclick = () => {ascentionUpgrade("autoPrintStack","earth")}
document.querySelector(".marsEarthAutoUpgradeStackBuy").onclick = () => {ascentionUpgrade("autoUpgradeStack","earth")}
document.querySelector(".marsEarthAtomicPowerBuy").onclick = () => {ascentionUpgrade("atomicPower","earth")}
document.querySelector(".marsEarthAscentionTaxCutsBuy").onclick = () => {ascentionUpgrade("taxCuts","earth")}
document.querySelector(".marsEarthAscentionBOGOFBuy").onclick = () => {ascentionUpgrade("BOGOF","earth")}

document.querySelector(".marsEartharcaneScholarBuy").onclick = () => {ascentionHire("arcaneScholar","earth")}
document.querySelector(".marsEarthtechnomancerBuy").onclick = () => {ascentionHire("technomancer","earth")}
document.querySelector(".marsEarthshadowHackerBuy").onclick = () => {ascentionHire("shadowHacker","earth")}
document.querySelector(".marsEarthroguewizzardBuy").onclick = () => {ascentionHire("roguewizzard","earth")}
document.querySelector(".marsEarthEnchanterBuy").onclick = () => {ascentionHire("Enchanter","earth")}

document.querySelector(".marsMoonAscentionMultiplierBuy").onclick = () => {ascentionUpgrade("multiplier","moon")}
document.querySelector(".marsMoonAutoPrintStackBuy").onclick = () => {ascentionUpgrade("autoPrintStack","moon")}
document.querySelector(".marsMoonAutoUpgradeStackBuy").onclick = () => {ascentionUpgrade("autoUpgradeStack","moon")}
document.querySelector(".marsMoonAtomicPowerBuy").onclick = () => {ascentionUpgrade("atomicPower","moon")}
document.querySelector(".marsMoonAscentionTaxCutsBuy").onclick = () => {ascentionUpgrade("taxCuts","moon")}
document.querySelector(".marsMoonAscentionBOGOFBuy").onclick = () => {ascentionUpgrade("BOGOF","moon")}

document.querySelector(".marsMoonarcaneScholarBuy").onclick = () => {ascentionHire("arcaneScholar","moon")}
document.querySelector(".marsMoontechnomancerBuy").onclick = () => {ascentionHire("technomancer","moon")}
document.querySelector(".marsMoonshadowHackerBuy").onclick = () => {ascentionHire("shadowHacker","moon")}
document.querySelector(".marsMoonroguewizzardBuy").onclick = () => {ascentionHire("roguewizzard","moon")}
document.querySelector(".marsMoonEnchanterBuy").onclick = () => {ascentionHire("Enchanter","moon")}

document.querySelector(".marsMarsAscentionMultiplierBuy").onclick = () => {ascentionUpgrade("multiplier","mars")}
document.querySelector(".marsMarsAutoPrintStackBuy").onclick = () => {ascentionUpgrade("autoPrintStack","mars")}
document.querySelector(".marsMarsAutoUpgradeStackBuy").onclick = () => {ascentionUpgrade("autoUpgradeStack","mars")}
document.querySelector(".marsMarsAtomicPowerBuy").onclick = () => {ascentionUpgrade("atomicPower","mars")}
document.querySelector(".marsMarsAscentionTaxCutsBuy").onclick = () => {ascentionUpgrade("taxCuts","mars")}
document.querySelector(".marsMarsAscentionBOGOFBuy").onclick = () => {ascentionUpgrade("BOGOF","mars")}

document.querySelector(".marsMarsarcaneScholarBuy").onclick = () => {ascentionHire("arcaneScholar","mars")}
document.querySelector(".marsMarstechnomancerBuy").onclick = () => {ascentionHire("technomancer","mars")}
document.querySelector(".marsMarsshadowHackerBuy").onclick = () => {ascentionHire("shadowHacker","mars")}
document.querySelector(".marsMarsroguewizzardBuy").onclick = () => {ascentionHire("roguewizzard","mars")}
document.querySelector(".marsMarsEnchanterBuy").onclick = () => {ascentionHire("Enchanter","mars")}
}


document.querySelector(".changeWorldUp").onclick =() => {
    planet += 1
}
document.querySelector(".changeWorldDown").onclick =() => {
    planet -= 1
}

document.querySelector(".changeAsteroidUp").onclick =() => {
    if (asteroid == 0){}
    else {
        asteroid -= 1
    }
}
document.querySelector(".changeAsteroidDown").onclick =() => {
    asteroid += 1
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.querySelector(`.purchaseMoon`).onclick = () => {buyPlanet("moon")}
document.querySelector(`.moonPrestigeButton`).onclick = function () { prestige("moon") }
document.querySelector(`.moonBuyMoreMoney`).onclick = function() {prestigeUpgrade(`multiplier`,"moon")}
document.querySelector(`.moonBuyMoreTokens`).onclick = function() {prestigeUpgrade(`tokensAdd`,"moon")}
document.querySelector(`.moonBuyNuclearFactories`).onclick = function() {prestigeUpgrade(`nuclearPower`,"moon")}
document.querySelector(`.moonBuyTaxCuts`).onclick = function() {prestigeUpgrade(`taxCuts`,"moon")}
document.querySelector(`.moonBuyBuyOneGetOneFree`).onclick = function() {prestigeUpgrade(`BOGOF`,"moon")}
document.querySelector(`.moonHireWizzard`).onclick = function () { prestigeHire(`wizzard`,"moon") }
document.querySelector(`.moonHireHackerMan`).onclick = function () { prestigeHire(`hackerman`,"moon") }
document.querySelector(`.moonHireArtist`).onclick = function () { prestigeHire(`artist`,"moon") }
document.querySelector(`.moonHireNasaEngineer`).onclick = function () { prestigeHire(`nasaEngineer`,"moon") }
document.querySelector(`.moonHireBuisnessManager`).onclick = function () { prestigeHire(`buisnessManager`,"moon") }
document.querySelector(`.moonUp`).onclick = () => {
    pages.moonPage += 1
}
document.querySelector(`.moonDown`).onclick = () => {
    if (pages.moonPage > 1) {
        pages.moonPage -= 1
    }
}
document.querySelector(`.moonAutoUpgradeBuy`).onclick = () => {
    autoUpgrade("moon")
}
document.querySelector(`.moonAutoPrintMoneyBuy`).onclick = () => {
    autoPrintMoney("moon")
}
document.querySelector(`.hireMoonBuilder`).onclick = () => {
    hire(`builder`,"moon")
}
document.querySelector(`.hireMoonEngineer`).onclick = () => {
    hire(`engineer`,"moon")
}
document.querySelector(`.hireMoonManager`).onclick = () => {
    hire(`manager`,"moon")
}
document.querySelector(`.hireMoonSuperManager`).onclick = () => {
    hire(`superManager`,"moon")
}
document.querySelector(`.moonUpgradeButton`).onclick = () => {
    toggleMenuVisibility(`.moonUpgrades`,"moon")
}
document.querySelector(`.moonPrestigeUpgradesButton`).onclick = () => {
    toggleMenuVisibility(`.moonPrestigeUpgrades`,"moon")
}
document.querySelector(`.printMoonMoney`).onclick = () => {giveMoney("moon")}
document.querySelector(".moonAscentionUpgradesButton").onclick = () => {
    toggleMenuVisibility(".moonAscentionUpgrades", "moon")
}
document.querySelector(".moonAscentionUp").onclick = () => {
    pages.moonAscentionPage += 1
}

document.querySelector(".moonAscentionDown").onclick = () => {
    if (pages.moonAscentionPage > 1) {
        pages.moonAscentionPage -= 1
    }
}


document.querySelector(`.purchaseMars`).onclick = () => {buyPlanet("mars")}
document.querySelector(`.marsPrestigeButton`).onclick = function () { prestige("mars") }
document.querySelector(`.marsBuyMoreMoney`).onclick = function() {prestigeUpgrade(`multiplier`,"mars")}
document.querySelector(`.marsBuyMoreTokens`).onclick = function() {prestigeUpgrade(`tokensAdd`,"mars")}
document.querySelector(`.marsBuyNuclearFactories`).onclick = function() {prestigeUpgrade(`nuclearPower`,"mars")}
document.querySelector(`.marsBuyTaxCuts`).onclick = function() {prestigeUpgrade(`taxCuts`,"mars")}
document.querySelector(`.marsBuyBuyOneGetOneFree`).onclick = function() {prestigeUpgrade(`BOGOF`,"mars")}
document.querySelector(`.marsHireWizzard`).onclick = function () { prestigeHire(`wizzard`,"mars") }
document.querySelector(`.marsHireHackerMan`).onclick = function () { prestigeHire(`hackerman`,"mars") }
document.querySelector(`.marsHireArtist`).onclick = function () { prestigeHire(`artist`,"mars") }
document.querySelector(`.marsHireNasaEngineer`).onclick = function () { prestigeHire(`nasaEngineer`,"mars") }
document.querySelector(`.marsHireBuisnessManager`).onclick = function () { prestigeHire(`buisnessManager`,"mars") }
document.querySelector(`.marsUp`).onclick = () => {
    pages.marsPage += 1
}
document.querySelector(`.marsDown`).onclick = () => {
    if (pages.marsPage > 1) {
        pages.marsPage -= 1
    }
}
document.querySelector(`.marsAutoUpgradeBuy`).onclick = () => {
    autoUpgrade("mars")
}
document.querySelector(`.marsAutoPrintMoneyBuy`).onclick = () => {
    autoPrintMoney("mars")
}
document.querySelector(`.hireMarsBuilder`).onclick = () => {
    hire(`builder`,"mars")
}
document.querySelector(`.hireMarsEngineer`).onclick = () => {
    hire(`engineer`,"mars")
}
document.querySelector(`.hireMarsManager`).onclick = () => {
    hire(`manager`,"mars")
}
document.querySelector(`.hireMarsSuperManager`).onclick = () => {
    hire(`superManager`,"mars")
}
document.querySelector(`.marsUpgradeButton`).onclick = () => {
    toggleMenuVisibility(`.marsUpgrades`,"mars")
}
document.querySelector(`.marsPrestigeUpgradesButton`).onclick = () => {
    toggleMenuVisibility(`.marsPrestigeUpgrades`,"mars")
}
document.querySelector(`.printMarsMoney`).onclick = () => {giveMoney("mars")}
document.querySelector(".marsAscentionUpgradesButton").onclick = () => {
    toggleMenuVisibility(".marsAscentionUpgrades", "mars")
}
document.querySelector(".marsAscentionUp").onclick = () => {
    pages.marsAscentionPage += 1
}

document.querySelector(".marsAscentionDown").onclick = () => {
    if (pages.marsAscentionPage > 1) {
        pages.marsAscentionPage -= 1
    }
}

document.querySelector(".ascendButton").onclick = () => {
    ascend()
}

document.querySelector(".earthTrackerBeamBuy").onclick = () => {
    buyTrackerBeam()
}
document.querySelector(".moonTrackerBeamBuy").onclick = () => {
    buyTrackerBeam()
}
document.querySelector(".marsTrackerBeamBuy").onclick = () => {
    buyTrackerBeam()
}

document.querySelector(".automationToggle").onclick = () => {
    toggleAsteroidMenuVisibility(".automations")
}
document.querySelector(".upgradesToggle").onclick = () => {
    toggleAsteroidMenuVisibility(".upgrades")
}
document.querySelector(".oreResearchToggle").onclick = () => {
    toggleAsteroidMenuVisibility(".oreResearch")
}
document.querySelector(".asteroidResearchToggle").onclick = () => {
    toggleAsteroidMenuVisibility(".asteroidResearch")
}
document.querySelector(".moreResearchToggle").onclick = () => {
    toggleAsteroidMenuVisibility(".moreResearch")
}
document.querySelector(".asteroidBeltToggle").onclick = () => {
    toggleAsteroidMenuVisibility(".asteroidBelts")
}



setIntervul(function(){
    if (canAscend() && ascentionAlerted == false) {
        customAlert("You can now Ascend!!! To Ascend, go to page 5 of upgrades on Mars.")
        ascentionAlerted = true
    }
},1000)

setIntervul(() => {
    if (q.asteroid.trackerBeam.purchased && q.asteroid.asteroidsMining < q.asteroid.maxAsteroids ) {
        var name = generateRandomString()



        customConfirm(`An asteroid with the name ${name} has been spotted!!! Would you like to mine it?`, () => {
            new Asteroid(name,q.asteroid.belt)
            q.asteroid.asteroidsMining += 1
        })
    }
},60000)

function e(){
    q.asteroid.trackerBeam.purchased = true
q.earth.prestige.amount = 1;q.moon.prestige.amount = 1;q.mars.prestige.amount = 1;q.mars.purchased = true;q.moon.purchased = true;    q.moon.prestige.prestigeTokens = 1432468136413264;q.mars.prestige.prestigeTokens = 1432468136413264
}