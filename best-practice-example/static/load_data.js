// Load and parse data from csv file
function loadData() {
    return d3.csv("static/data/data.csv", d => ({
        employee: d.employee,
        coffeeConsumption: +d.coffee_consumption,
        flamingoEnthusiasm: +d.flamingo_enthusiasm,
        peelSkill: +d.peel_skill
    }));
}