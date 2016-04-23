// Functions insert and locationOf taken from here: 
// http://stackoverflow.com/q/1344500

function insert(element, array) {
  array.splice(locationOf(element.start, array) + 1, 0, element);
  return array;
}

function locationOf(time, array, s, e) {
  s = s || 0;
  e = e || array.length;
  var pivot = parseInt(s + (e - s) / 2, 10);
  if (array[pivot] == null) return pivot
  if (array[pivot].start === time) return pivot;
  if (e - s <= 1)
    return array[pivot].start > time ? pivot - 1 : pivot;
  if (array[pivot].start < time) {
    return locationOf(time, array, pivot, e);
  } else {
    return locationOf(time, array, s, pivot);
  }
}

var calendar = { 
  events: {
    startTimes: [],
    endTimes: {}
  }
};

function EventStart(start, id) {
  var self = this;
  self.start = start;
  self.id = id;
}

function ADD(id, start, end) {
  insert(new EventStart(start, id), calendar.events.startTimes);
  calendar.events.endTimes[id] = end;
  console.log("Added event with id: ", id, " with start: ", start, " and end: ", end);
}

function QUERY(time) {
  var result = [];
  var startTimes = calendar.events.startTimes;
  var endTimes = calendar.events.endTimes;
  var finalStartIndex = locationOf(time, startTimes);

  for (var i = 0; i <= finalStartIndex; i++) {
    var event = startTimes[i];
    var eventId = event.id
    if (endTimes[eventId] != null && endTimes[eventId] > time) {
    	result.push(eventId);
    }
  }

  console.log("QUERY ", time, ": ", result.sort());
}

function CLEAR() {
  calendar.events.startTimes = [];
  calendar.events.endTimes = {};
  console.log("CLEAR");
}



// Tests

ADD("a", 10, 20);
ADD("b", 20, 30);
ADD("c", 30, 40);
ADD("d", 15, 25);
ADD("e", 35, 40);
ADD("f", 0, 100);

QUERY(0);
QUERY(5);
QUERY(10);
QUERY(20);
QUERY(39);
QUERY(99);

CLEAR();


ADD("a", 0, 9);
ADD("b", 1, 10);
ADD("c", 2, 11);
ADD("d", 3, 12);
ADD("e", 4, 13);
ADD("f", 5, 14);
ADD("g", 6, 15);
ADD("h", 7, 16);
ADD("i", 8, 17);
ADD("j", 9, 18);
ADD("k", 10, 29);

for (var i = 0; i < 22; i++) {
	QUERY(i);
}

CLEAR();


ADD("a", 0, 100);
ADD("b", 50, 60);
ADD("c", 10, 90);
ADD("d", 85, 110);
ADD("e", 45, 55);
ADD("f", 40, 60);
ADD("g", 55, 65);
ADD("h", 50, 51);
ADD("i", 10, 20);

for (var i = 0; i < 111; i = i + 10) {
	QUERY(i);
}
QUERY(51)

CLEAR();


ADD("a", 0, 10);
ADD("b", 10, 20);
ADD("c", 20, 30);
ADD("d", 100, 110);
ADD("e", 110, 120);
ADD("f", 120, 130);

QUERY(50);

CLEAR();