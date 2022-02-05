class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let relative = this.creator;
    let count = 0;

    while (relative) {
      relative = relative.creator;
      count++
    }
    return count
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // find the root vampire
  rootVampire() {
    rootVamp = {}

    if(this.creator) {
      rootVampire = this.creator;
      rootVamp.rootVampire();
    }

    return rootVamp;

  }
  
  // Returns the vampire object with that name, or null if no vampire offspring exists with that name
  vampireWithName(name) {
    // recurse creator until root is reached

    if (this.name === name) { // base case
      return this
    }

    if (this.offspring) { // recursive call
      for (let child of this.offspring) {
        const vamp = child.vampireWithName(name);
        if (vamp !== null) {
          return vamp;
        }
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let countDescendants = 0;

    if (this.offspring) {
      countDescendants += this.offspring.length;
    }

    for (let child of this.offspring) {
      const descendants = child.totalDescendents;
      countDescendants += descendants;

    }

    return countDescendants;
    
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];

    if (this.yearConverted > 1980) {
      millennials.push(this);
    }

    for (let child of this.offspring) {
      let nextVamps = child.allMillennialVampires;
      millennials = millennials.concat(nextVamps); // millennial concats childs results to parent results
    }
    
    return millennials; // return millennials from within the recursion
  };

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    // console.log('bloodline', this.bloodLine);
    // return this.bloodLine;
    

  }
}

console.log()

module.exports = Vampire;

