function Hooray() {
    for (var i = 0; i  < arguments.length; i++)
        this[i] = arguments[i];

    this.length = arguments.length;
}

/**
 * FOR-EACH.
 * Iterates the current hooray and evaluates an expression on each item.
 * 
 * @param {Function} expression The expression to evaluate in each item of the hooray.
 * 
 * @throws {TypeError} If expression is not a function.
 */
Hooray.prototype.forEach = function(expression) {
	if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');

	//throw Error('🤡');
	for (var i = 0; i < this.length; i++) 
		expression(this[i], i, this);
};

/**
 * PUSH.
 * Pushes a variable number of items into this hooray.
 * 
 * @param {...any} item The item (or items) to push.
 * 
 * @returns {number} The new length of the hooray.
 */

Hooray.prototype.push = function() { 

	for (var i = 0; i < arguments.length; i++)
		this[this.length++] = arguments[i];

	return this.length;
};



/**
 * FIND-INDEX
 * Find the first element that accomplish a condition and returns its index. 
 * 
 * @param {Hooray} hooray we want to test.
 * @param {Function} expression that contains the condition. 
 * @returns {element} index number of the element found. 
 * */

Hooray.prototype.findIndex = function(expression) { 
if (!(this instanceof Hooray)) throw TypeError(this + " is not defined");
if (!(expression instanceof Function)) throw TypeError(expression + " is not a function");
    
for (let i = 0; i < this.length; i++){
        if(expression(this[i])) {
            return i;
        }  
    } 
     return -1;  
} 
    
/**
 * FILTER.
 * Create a new hooray with the elements that pass the condition. 
 * 
 * @param {Hooray} hooray we want to test.
 * @param {Function} expression that contains the condition. 
 * @returns {Hooray} the new hooray with the condition applied. 
 * */

Hooray.prototype.filter = function (expression) {

    if (!(this instanceof Hooray)) throw TypeError(this + ' is not a hooray');
    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    var newHooray = new Hooray;
        for (i = 0; i < this.length; i++) {
        if(expression(this[i])) {
        newHooray[newHooray.length] = this[i];
        newHooray.length++;
        }
    }
    return newHooray;
}

  /**
 * EVERY.
 * Checks if all the elements in the hooray accomplish the condition given. 
 * 
 * @param {Hooray} hooray initial. 
 * 
 * @param {Function} expression The condition to evaluate the array
 * 
 * @returns {boolean} returns true if all the elements accomplish; if not, returns false;
 * 
 */

Hooray.prototype.every = function (expression) {
	if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');
	
    for (let i = 0; i < this.length; i++) {
        if (!expression(this[i])) return false;
    }
    return true;
};

/**
 * MAP.
 * Iterates through all the items of a Hooray and change them according to an expression.
 * Returns a new hooray with the items modified.
 * 
 * @param {Hooray} hooray where it takes the initial items. 
 * @param {Function} function that apply changes. 
 * 
 * @returns {Hooray} A new hooray with the modifications done. 

 * @throws {TypeError} If Function is not a function.
 */

Hooray.prototype.map = function(expression) { 
  
    if(!(expression instanceof Function)) throw TypeError(expression + ' is not a function');
    
    var result = new Hooray();
    for (i = 0; i < this.length; i++) {
		result[i] = expression(this[i]);
		result.length++;
    }
    return result;
}


/**
 * FILL.
 * Fill the hooray to iterate with the items that you sent.
 * 
 * @param {Hooray} hooray The initial hooray.
 * @param {*} newItem Character we will use to replace items from hooray.
 * 
 */

Hooray.prototype.fill = function(newItem){
	var start = 0;
	var end = this.length;
	
	switch(arguments.length){
	  case 2:
		start = arguments[1];
		break;
	  case 3:
		start = arguments[1];
		end = arguments[2];
		break;
	  default:
		  if (arguments.length < 1 ) newItem = undefined;
		break;
	}

	for(var i = start; i < end; i++){
		this[i] = newItem;
	  }  	  
  };

  /**
 * CONCAT.
 * Concatenate an initial hooray with other arguments and returns a new hooray with all the elements. 
 * 
 * @param {array} Array The initial array given. 
 * @param {*} other arguments given. 
 * 
 * 
 * @returns {Hooray} new Hooray that contains initial Array and the elements given, all concatenated. 
 * 
 */
Hooray.prototype.concat = function() { 	
	var newHooray = new Hooray();	
	
    for (var y = 0; y < this.length; y++){
        newHooray[y] = this[y];
    }
		
    for (var i = 0; i < arguments.length; i++) {
		if (arguments[i] instanceof Array) {
			for (var j = 0; j < arguments[i].length; j++){
				newHooray[y] = arguments[i][j];
				++y
			}
		} else {
			newHooray[y] = arguments[i];
			++y			
		}
	}      
	newHooray.length = y;
    return newHooray;
    
};

/** 
 * SHIFT.
 * Deletes the first item of a hooray and shifts each item into a lower index.
 * Returns de removed item of the hooray.
 * @param {Hooray} initial hooray array given. 
 * @param {*} other arguments given. 
 * 
 * @returns {any} The item deleted from the hooray.
 */
Hooray.prototype.shift = function  () {
    
    if (this.length===0) return undefined;
    var itemShifted = this[0];

    for (var i=1; i<this.length; i++) {
        this[i-1]=this[i];
    }
    
    delete this[this.length-1];
    this.length--;
    return itemShifted;
}

/**
 * UNSHIFT.
 * Add a new item at beggining of an hooray and unshifts each item into a higher index.
 * 
 * @param {any} item The item will be added in the hooray.
 * 
 * @returns {Number} the new length of the Hooray
 */
Hooray.prototype.unshift = function () {

    for (var i=((this.length-1)+(arguments.length)); i>0; i--) {
        this[i]=this[i-(arguments.length)];
    }
    for (var i=0; i<(arguments.length); i++) {
        this[i]=arguments[i];
    }
	this.length += arguments.length;
    return this.length;
};


/**
 * POP.
 * Deletes the last item of an hooray and returns de deleted item.
 *  @param {hooray}  initial hooray where we pop things. 
 * @returns {any} returns de last item deleted on the hooray.
 */
Hooray.prototype.pop = function () {
    
    if (this.length===0) return undefined;

    var result = this[this.length-1];
    
    delete this[this.length-1];
    this.length-=1;
    
    return result;
};

/** 
 * JOIN.
 * Converts an Array into a String merging each item with the separator if it's provided.
 * 
 * @param {String} separator Optional -- Separator between each element. 
 *                           If an separator is omited, as default separator is a coma.
 * 
 * @returns {string} The Hooray as a string.
 */
Hooray.prototype.join = function () {
        
    var separator = arguments[0] || ",";
    var string='';

    for (var i=0; i<this.length; i++) {
        string+=this[i];
        if (i<this.length-1) string+=separator;
    }
    return string;
};

/**
 * FIND.
 * Returns the first item that accomplish the expression provided.
 * 
 * @param {Function} expression The expression that evaluates the items to be returned.
 * 
 * @returns {*} The first item that accomplish the expression provided.
 *              If there're no items that accomplish, returns undefined.
 * 
 * @throws {TypeError} If the expression is not a function.
 */
Hooray.prototype.find = function (expression) {
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');
    
    for (i=0; i<this.length; i++) {
        if (expression(this[i])) return this [i];
    }
    return undefined;
};

/**
 * INDEX-OF.
 * Returns the index of an element found into the hooray. If the element is not found, returns -1.
 * @param {Hooray} The initial hooray to look into it. 
 * @Returns {*} element with the index of the element searched or -1 in case the element is not into de Hooray. 
 * 
 */

Hooray.prototype.indexOf = function (item) {
    var start = arguments[1] || 0;

    if (typeof(start) !== "number") start=0;

    start = start < 0 ? this.length + start : start;

    for (var i=start; i<this.length; i++) {
        if (this[i]===item) return i;
    }
    return -1;
}

/**
 * REDUCE.
 * 
 * executes a provided function for each value of the array (from left-to-right).
 * 
 * 
 */

Hooray.prototype.reduce = function (expression) {
    
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');
    if (this.length === 0) throw TypeError("Reduce of empty hooray with no initial value");
    
    var result=0;
    for (i=0; i<this.length; i++) {
        result=expression(result,this[i]);
    }
    
    return result;
}

/**
 * REVERSE.
 * Reverse the order of the elements of a hooray. 
 * @param {hooray} Hooray that contains the initial elements.
 * @return {hooray} Hooray with the values in order inverted. 
 * 
 */

Hooray.prototype.reverse = function () {
     
    var ini=0;
    var fin=this.length-1;
    var item;
    
    while (ini<fin) {
        item=this[fin];
        this[fin]=this[ini];
        this[ini]=item;
        
        ini++;
        fin--;
    }
}

/**
 * SLICE.
 * @Returns {*} the selected elements in a hooray, as a new hooray.
 *  
 */

Hooray.prototype.slice = function () {

    var start = arguments[0] || 0;
    if (typeof(start) !== "number") start = 0;
    start = start < 0 ? this.length + start : start;
    var end = arguments[1] || this.length;
    if (typeof(end) !== "number") end = 0;
    end = end < 0 ? this.length + end : end;

    if (end > this.length) end = this.length;

    var newHooray = new Hooray ();   

    for (var i=start; i<end; i++) {
        newHooray[newHooray.length++]=this[i];
    }
    return newHooray;
}

/**
 * SOME.
 * 
 * 
 * 
 * 
 */

Hooray.prototype.some = function (expression) {
    
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');
    
    
    for (i=0; i<this.length; i++) {
        if (expression(this[i])) return true;
    }
    return false;
}

/**
 * SORT.
 * 
 * 
 * 
 * 
 */

Hooray.prototype.sort = function () {
    
    var sorted = false;
    var aux;

    var expression = arguments [0] || (function (a,b) { return b < a ? 1 : -1 });

    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');


    while (!sorted) {
        sorted = true;
        for (var i=0; i<this.length-1; i++){
            
            if ((expression(this[i].toString().charCodeAt(0),this[i+1].toString().charCodeAt(0))>0)) {
                aux = this[i+1];
                this[i+1] = this[i];
                this[i] = aux;
                sorted = false;
            }
        }
    }
}

/**
 * SPLICE.
 * Add in the array the items from the indicated index and returns the deleted Items, if deleteCount > 0.
 * 
 * @param {Number} start The starting position in the array
 * @param {Number} deleteCount Optional. Number of items that will be deleted in the array
 * @param {*} - Optional. Item1 ... ItemX - Items that will be added to the array. 
 *              When omitted, nothing is added, but #deleteCount items will be deleted since start index
 */

 Hooray.prototype.splice = function (start) {


    var deleteCount = arguments [1] || 0; 
    if (start < 0) start = (this.length)+start;
    if (deleteCount > (this.length+start)) deleteCount=this.length+start;

    var deleted = new Hooray();
    if (start >= this.length) 
        start = this.length;
    if (start+deleteCount > this.length) 
                    deleteCount=this.length-start;
    if (start===(this.length-1)) 
                    this.length--;


    if (deleteCount) {
        for (var i=start; i<start+deleteCount; i++) {
            deleted[deleted.length++]=this[i];
        }
    
        for (var i=start; i<this.length; i++) {
            if (i+deleteCount<this.length)
                this[i]=this[i+deleteCount];
        }
        
        for (var i=0; i<deleteCount; i++)
            delete this[this.length-deleteCount+i];

        this.length-=deleteCount;
    }

    if (arguments.length>2) {
        for (var i=this.length-1; i>=start; i--) {
            this[i+(arguments.length-2)]=this[i];
        }
        for (i=0; i<(arguments.length-2); i++) {
            this[start+i]=arguments[i+2];
            this.length++;
        }
    }
                
    return deleted;
}

/**
 * TOSTRING.
 * Converts an Array into a String.
 *
 *  
 */
Hooray.prototype.toString = function () {
    var string='';
    
    for (var i=0; i<this.length; i++) {
        string+=this[i];
        if (i<this.length-1) string+=',';
    }
    return string;
}

/**
 * INCLUDES.
 * Itearates an hooray and searchs if an item is included or not in a hooray.
 * 
 * @param {Function} expression The item that want to know if is included on the hooray.
 * @param {Number} start Optional. The starting position to start searching.
 *                       Default 0. If start is not a valid number, or < 0, Default starting.
 * 
 * @returns {Boolean} True if item's included on hooray, false if not.
 */

Hooray.prototype.includes = function (item) {

    var start = arguments[1] || 0;
    if (typeof(start) !== "number") start = 0;
    start = start < 0 ? 0 : start;

    for (i=0; i<this.length; i++) {
        if (this[i]===item)  return true
    }
    return false;
}
