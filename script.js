/*  My To Do List
* All the stuff that has to be done

**1. Allow the addition of subtraction symbols
**2. Do that Ans thing on the google calc
**3. Make it so that mesg only comes through clr
1. Add more buttons
   **a. Percent Button
   b. Sqrt Button
   c. (Parenthesis)
   4. Maybe a Pi Button
--2. Make one button deal with backspce and clr
**6. Change the view
**7. Add commas
3. Scientific Notation
**4. Typing input
*/

Input = {
  // Calling the Inputs
  Expression: document.querySelector('input#expression'),
  Result: document.querySelector('input#result'),
};

Buttons = {
  // Calling the Buttons
  Clear: document.getElementById('clear'),
  Backspace: document.getElementById('back'),
  Operator: document.querySelectorAll('.operator'),
  // Percent: document.querySelector('#percent'),
  Number: document.querySelectorAll('.number'),
  Equals: document.getElementById('equals'),
};

Keys = document.querySelector('#keys');

// Adding EventListeers so the Buttons click
// *Note* Consider looking into this and changing how it works with Event Delegation

Keys.addEventListener('click', function (element) {
	switch (element.target.className) {
		case 'number':
			insert.Number(element.target.value);
			break;
		case 'operator':
			insert.Operator(element.target);
			break;
		case '':
			switch (element.target.id) {
				case 'clear':
					insert.Clear();
					break;
				case 'back':
					insert.Backspace();
					break;
				case 'equals':
					insert.Evaluate();
				default:
					break;
			}
		default:
			break;
	}
}, false);

Buttons.Number.forEach(button => {
  button.addEventListener('click', function () {

    // insert.Number(button.value);
  });
});

Buttons.Operator.forEach(button => {
  button.addEventListener('click', function () {
    // insert.Operator(button);
  });
});

// Buttons.Percent.addEventListener('click', function () {
//   insert.Percentage();
// });

Buttons.Clear.addEventListener('click', function () {
  // insert.Clear();
});

Buttons.Backspace.addEventListener('click', function () {
  // insert.Backspace();
});

Buttons.Equals.addEventListener('click', function () {
  // insert.Evaluate();
});


/* Declaring Important Variables
 * Answer: The final answer to the Math Inputed
 * Cleared: A Boolean that checks if the Input Section is in a "Cleared" State
 * Solve: A Boolean telling the calculator if the Math inputed is Solvable
 * Confuzzled
*/
var inputHistory = [];
var mathHistory = [];
var typeList = [];
var inputString = '';
var mathString = '';
var Answer = 0;
var Cleared = false;
var Solve = true;

/* getLastInput: Allows to look backwards through the mathHistory
 * @factor: Allows me to Dictate What type of information is returned
 * @p: Allows me to dictate how far back I can go
 * Confuzzled
*/
var getLastInput = function (factor, p) {
  var places;
  if (!p || p == 'last') {
    places = 1;
  } else {
    places = p;
  }
  switch (factor) {
    case 'value':
      return mathHistory.length > places - 1 // Is the Length of the mathHistory greater than
        ? mathHistory[mathHistory.length - places].value
        : null;
      break;
    case 'type':
      return mathHistory.length > places - 1
        ? mathHistory[mathHistory.length - places].type
        : null;
      break;
    case 'solution':
      return mathHistory.length > places - 1
        ? mathHistory[mathHistory.length - places].solve
        : null;
      break;
    case 'element':
      return mathHistory.length > places - 1
        ? mathHistory[mathHistory.length - places].id
        : null;
      break;
		case 'everything':
			return mathHistory.length > places - 1
				? mathHistory[mathHistory.length - places]
				: null;
			break;
    default:
      break;
  }
};

/* insertNum: Function used to Insert a number to the mathHistory
 * @v: the value of the number
 * @t: The type of the input ('number')
 * @s: Is the Input data solvable at this point
*/
var insertNum = function (v, t, s) {
  mathHistory.push({
    value: v,
    type: t,
    solve: s,
  });

  if (getLastInput('type', 2) == 'number' && inputHistory.length > 0) {
    var str = String(inputHistory[inputHistory.length - 1]).concat(String(v));
    inputHistory[inputHistory.length - 1] = str.format();
  } else {
    inputHistory.push(v);
  }
  Cleared = false; // No longer in a "Cleared" State
  Solve = true; // Whenever a number is inputed, you're guaranteed It's Solvable
};

/* inputOp: Function used to input an Operation
 * @operator: The operator called, (This is gotten through the EventListener Event Target or the Even Key)
*/
function insertOp(operator) {
  mathHistory.push({
    value: operator.value,
    type: 'operator',
    solve: false,
    id: operator.id,
    sign: operator.sign,
  });

  inputHistory.push(operator.sign);
  Cleared = false;
  Solve = false;
}

// convertMathHistory: Runs through mathString and returns a string version
var convertMathHistory = function () {
  var str = '';
  for (var element of mathHistory) {
    str += `${element.value}`.replace(/,/g, ''); // Removes the commas that may arise through the Number Formating
  }
  return str;
};

// convertInputHistory: Convert Input History into a string
var convertInputHistory = function () {
  return inputHistory.join('');
};

/* formatInputHistory: Returns the Input History as a string with all the numbers
 * Confuzzled
*/
var formatInputHistory = function () {
  // var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  for (var element of inputHistory) {
    if (element.length <= 3) {
      element = element;
    } else {
      element.replace(/,/g, '');
      element = element.format();
    }
  }
  return inputHistory;
};

/* updateResDisplay: Updates the Result Display
 * > If there ins't a requested value inputed, it means you 

*/
function updateResDisplay(val) {
  if (!val) {
    inputString = convertInputHistory();
    Input.Result.value = inputString;
  } else {
    Input.Result.value = val;
  }
  if (Input.Result.value.length == 0 && Cleared == false) {
    Input.Result.value = '0';
  } else if (Input.Result.value.length == 0 && Cleared == true) {
    Input.Result.value = '';
  }
}

function updateExpDisplay(value) {
  Input.Expression.value = value;
}

function Round(value) {
  if (`${value}`.includes('.') == true) {
    var splitVal = `${value}`.split('.');
    if (splitVal[1].length >= 12 - splitVal[0].length) {
      return math.round(value, 12 - splitVal[0].length);
    } else {
      return value;
    }
  } else {
    return value;
  }
}

function Ans() {
  updateExpDisplay(`Ans=${Answer}`);
}

var insert = {
  Operator: function (op, nonButton) {
    if (nonButton === true) { // If this function was not called through a Button
      var signs = [ // Here is the information for the different Operators that could be asked for
        ['*', 'mult', '\u00d7'],
        ['/', 'division', '\u00f7'],
        ['+', 'add', '\u002b'],
        ['-', 'sub', '\u2212'],
      ];
			var foundOp = signs.find(item => item[0] == op); // Fidn the sign of the Operator that was called for
      var operator = {
        value: op,
        type: 'operator',
        solved: false, // There is no way that an operator could be added and the expression be solved
        id: foundOp[1],
        sign: foundOp[2],
      };
    } else {
      var operator = {
        value: op.value,
        type: 'operator',
        solved: false,
        id: op.id,
        sign: op.getAttribute('sign'),
      };
    }

    if (getLastInput('solution') == true) {
      Ans();
    }
		if (getLastInput('value') == '.') {
			insertNum(0, 'number', false);
		}
    if (operator.id == 'sub') {
      Ans();
      // *Note* That Numbers can make a Loop-hole in this case
      if (mathHistory.length == 0 || getLastInput('element') != 'sub') {
				// ^ Prevents repeating sub operators and allows sub operator when screen is empty
        insertOp(operator);
        updateResDisplay();
      }
    } else { // If you are not a subtraction operator
      if (
			mathHistory.length == 0 || // If the screen is empty
			getLastInput('element') == 'sub' && 
			getLastInput('type', 2) == 'operator' || // or there is an operator followed by an equal sign
			mathHistory.length == 1 &&
			getLastInput('type') == 'operator' // or if the only input present is an operator
			) {
        return; // Return and do nothing
      } else if (getLastInput('type') == 'operator') {
        if (getLastInput('element') != 'sub') {
          mathHistory.pop();
          inputHistory.pop();
          insertOp(operator);
          updateResDisplay();
        } else {
          mathHistory.pop();
          inputHistory.pop();
          insertOp(operator);
          updateResDisplay();
        }
      } else {
        insertOp(operator);
        updateResDisplay();
      }
    }
  },
  Number: function (num) {
    // console.log(getLastInput("type"));
    if (mathHistory.length == 0) {
      Ans();
    }
    if (
      getLastInput('solution') == true ||
      (getLastInput('value') == 0 && mathHistory.length == 1)
    ) {
      mathHistory.length = 0;
      inputHistory.length = 0;
      insertNum(num, 'number', false);
      updateResDisplay();
      Ans();
    } else if (
      (mathHistory.length == 0 && num == '.') ||
      (getLastInput('type') == 'operator' && num == '.')
    ) {
      insertNum(0, 'number', false);
      insertNum(num, 'number', false);
      updateResDisplay();
		} else if (
			getLastInput('value') == '.' && num == '.'
		) {
			return;
		} else {
      insertNum(num, 'number', false);
      updateResDisplay();
    }
  },
  Percentage: function () {
    if (getLastInput('type') == 'number') {
      var lastMathNum = [];
      var lastMathNumValues = [];
      var leftSide;
      var newIndex;
      inputHistory.pop();
      while (getLastInput('type') == 'number') {
        lastMathNum.unshift(mathHistory[mathHistory.length - 1]);
        lastMathNumValues.unshift(mathHistory[mathHistory.length - 1].value);
        mathHistory.pop();
      }
      if (lastMathNumValues.includes('.')) {
        newIndex = lastMathNumValues.indexOf('.');
        lastMathNum.splice(newIndex, 1);
        lastMathNum.splice(newIndex, 0, {
          value: '.',
          type: 'number',
          solve: false,
        });
        lastMathNumValues.splice(newIndex, 1);
        lastMathNumValues.splice(newIndex, 0, '.');
      } else {
        newIndex = lastMathNum.length - 2;
        lastMathNum.splice(newIndex, 0, {
          value: '.',
          type: 'number',
          solve: false,
        });
        lastMathNumValues.splice(newIndex, 0, '.');
      }
      lastMathNum.forEach(element => mathHistory.push(element));
      lastInputNumValues = lastMathNumValues.join('').format();
      inputHistory.push(lastInputNumValues);
    } else {
      return;
    }
    updateResDisplay();
  },
  Clear: function () {
    mathHistory.length = 0;
    inputHistory.length = 0;
    Input.Expression.value = '';
    Answer = 0;
    Cleared = true;
    updateResDisplay();
  },
  Backspace: function () {
    if (mathHistory.length > 0) {
      var last = inputHistory[inputHistory.length - 1];
      if (last.length == 1 || getLastInput('solution') == true) {
        inputHistory.pop();
      } else {
        last = last.slice(0, -1);
        inputHistory[inputHistory.length - 1] = last.format();
      }
      mathHistory.pop();
    }
    updateResDisplay();
  },
  Evaluate: function () {
    if (mathHistory.length > 0) {
      if (Solve === true) {
        inputString = convertInputHistory();
        mathString = convertMathHistory();
        var formatedNum =
          math.evaluate(mathString) != 'Infinity'
            ? Round(math.evaluate(mathString)).format()
            : math.evaluate(mathString);
        Answer = math.evaluate(mathString) == 0 ? '0' : formatedNum;
        updateExpDisplay(inputString + '=');
        mathHistory.length = 0;
        inputHistory.length = 0;
        insertNum(Answer, 'number', true);
        updateResDisplay(Answer);
      } else if (Solve === false) {
        updateResDisplay('NO...Wrong');
      }
    } else {
      Ans();
      updateResDisplay(0);
    }
  },
};

document.addEventListener('keyup', function (event) {
  if (event.key >= 0 && event.key <= 9 || event.key == ".") { // Checks if you Pressed a Number or Decimal Point
    insert.Number(event.key);
  } else if (event.key == 'Backspace') { // If You Pressed Backspace
    insert.Backspace();
  } else if (event.key == 'c') { // If You Pressed c (Clear)
    insert.Clear();
  } else if ( // Now, If You Pressed An Operator *Look Below*
    event.key == '*' ||
    event.key == '/' ||
    event.key == '+' ||
    event.key == '-'
  ) {
    insert.Operator(event.key, true); // (The Boolean is to tell insert.Operator that you used the keyboard)
  } else if (event.key == 'Enter' || event.key == '=') {
    insert.Evaluate();
  }
});