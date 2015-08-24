var Griddle = (function(){
	
	var currentColumnCount = 0;
	var matrix = [];
	var colors=["#002744", "#194d75", "#0065B3", "#724e34", "#3b3b3d"];

	var classes = ["zeroColumn", "oneColumn", "twoColumn", "threeColumn", "fourColumn"];
	var fillerItems;
	var fillersUsed = 0;

	function getFillerItems(){
		fillerItems = $("#items .referenceBox .filler.item").remove();
	}

	function resize() {
		try {
			checkColumnCount();
			updateItemsHeight();
		}
		catch(error) {
			console.log(error);
		}
	}

	function redraw() {
		resize();
	}

	function updateItemsHeight() {
		var h = $("#items .referenceBox").innerHeight();
		var r = matrix.length;
		var computed = h*r + 5 + "px";
		$("#items").css({height:computed});
	}

	function checkColumnCount() {
		var newColumnCount = Math.ceil( ($("#items").width()-90) / 320 );
		if (newColumnCount==0) return;
		if (newColumnCount!=currentColumnCount) setColumns(newColumnCount);
	}

	function setColumns(numColumns) {
		// update the currentColumnCount
		currentColumnCount = numColumns;
		$("#items").removeClass().addClass(classes[currentColumnCount]);
		// parse list of items and apply new pattern
		matrix = [];
		$("#items .referenceBox .filler.item").remove();
		fillersUsed = 0;
		var items = $("#items .item").get();
		while (items.length > 0)
		{
			var slot = getNextAvailableSlot();
			var item = getBestItemFit(slot, items);
			if (currentColumnCount>1 && isLarge(item) && !slot.large) {
				while (!slot.large) {
					fillDeadSlot(slot);
					slot=getNextAvailableSlot();
				}
			}
			fillSlot(slot,item);
		}
		while (slotsAreAvailable()){
			var slot = getNextAvailableSlot();
			fillDeadSlot(slot);
		}
		// hide items
		TweenLite.set("#items .item", {autoAlpha:0, scaleX:0.75, scaleY:0.75});
		// show items
		var tl = new TimelineLite();
		tl.staggerTo("#items .item", 0.4, {autoAlpha:1, scaleX:1, scaleY:1}, 0.2);
	}

	function slotsAreAvailable() {
		if (matrix.length==0) return false;
		for (var r=0; r<matrix.length; r++) {
			var row = matrix[r];
			for (var c=0; c<row.length; c++) {
				if (matrix[r][c] == false) return true;
			}
		}
		return false;
	}

	function getNextAvailableSlot() {
		if (matrix.length==0) addRow();
		for (var r=0; r<matrix.length; r++) {
			var row = matrix[r];
			for (var c=0; c<row.length; c++) {
				if (matrix[r][c] == false) return new Slot(r,c);
			}
		}
		addRow();
		return getNextAvailableSlot();
	}

	function addRow(){
		var row = [];
		for (var i=0;i<currentColumnCount; i++) { row.push(false); }
		matrix.push(row);
	}

	function Slot(row,column) {
		var large = true;
		var thisRow = matrix[row].slice(column,column+2);
		if (thisRow.length<2) large=false;
		if (thisRow.indexOf(true)>-1) large=false;
		if (matrix.length>row+1) {
			var nextRow = matrix[row+1].slice(column,column+2);
			if (nextRow.length<2) large=false;
			if (nextRow.indexOf(true)>-1) large=false;
		}
		return {row:row, column:column, large:large}
	}

	function getBestItemFit(slot, items) {
		if (currentColumnCount==1) return items.splice(i,1)[0];
		for (var i=0; i<items.length; i++) {
			var item = items[i];
			if (!isLarge(item)) return items.splice(i,1)[0];
			if (slot.large) return items.splice(i,1)[0];
		}
		return items.splice(0,1)[0];
	}

	function fillDeadSlot(slot) {
		var item = getNextFillerItem();
		$("#items .referenceBox").append(item);
		fillSlot(slot, item);
	}

	function fillSlot(slot, item) {
		matrix[slot.row][slot.column] = true;
		if (currentColumnCount>1 && isLarge(item)) {
			matrix[slot.row][slot.column + 1] = true;
			if (matrix.length==slot.row+1) addRow();
			matrix[slot.row+1][slot.column] = true;
			matrix[slot.row+1][slot.column + 1] = true;
		}
		var top = (slot.row * 100) + (slot.row==0 ? "" : "%");
		var left = (slot.column * 100) + (slot.column==0 ? "" : "%");
		$(item).css({top:top, left:left});
	}

	function getNextFillerItem() {
		if (fillersUsed==fillerItems.length) return generateFillerItem();
		var item = fillerItems[fillersUsed];
		fillersUsed++;
		return $(item).clone();
	}

	function generateFillerItem(){
		var color = colors[Math.floor(Math.random()*colors.length)];
		var interior = $('<div class="interior"><img src="images/referenceBox.png"></div>').css({backgroundColor:color});
		var item = $('<span></span>').addClass("small filler item").append(interior);
		return item;
	}

	function isLarge(item) {
		return $(item).hasClass("large");
	}

	function init() {
		getFillerItems();
		$(window).on("resize", resize);
		resize();
	}

	return {
		init : init,
		redraw : redraw
	}

})(jQuery)

