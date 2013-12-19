<<<<<<< HEAD
WAF.define('Gauge', function() {
=======
(function() {
>>>>>>> 883a404ef4b3a2a90bdb5ddf0d48436f2434f8c4

    var Widget = WAF.require('waf-core/widget'),
    	widget = Widget.create('Gauge');

<<<<<<< HEAD
    widget.prototype.init = function () {
    	 
    	//creating an unique id for the container 
    	this.containerID ='gaugeContainer'+this.id
		//adding a span node to my widget
        $(this.node).html('<span id="'+this.containerID+'"></span>');
			
		// the gauge config values	
		this.config = {
			size: this.fixSize(),
			label: this.displayname(), 
			min: this.minvalue(),
			max: this.maxvalue(),
			minorTicks: 5
		}
		
		//rendering the widget
		this.render();
		
		//Defining the onChange method for the relevant attributes
		this.value.onChange( function() { 
    		this.gauge.redraw(this.value()); 
    	});	
    	this.displayname.onChange( function(value) {
    		this.config.label = value; 
    		this.render(); 
    	});	
    	this.minvalue.onChange( function(value) {
    		this.config.min = value; 
    		this.render(); 
    	});	
    	this.maxvalue.onChange( function(value) {
    		this.config.max = value; 
    		this.render(); 
    	});	
    };  
    
       
    widget.prototype.getZones = function () {   	
		var range = this.config.max - this.config.min;
		this.config.yellowZones = [{ from: this.config.min + range*0.75, to: this.config.min + range*0.9 }];
		this.config.redZones = [{ from: this.config.min + range*0.9, to: this.config.max }];
	};
     
    
    widget.prototype.fixSize = function () {
    	
    	//getting the size
    	var width = this.width();
    	var height = this.height();
    	
    	//making sure we have a square widget and multiplying by 0.9 to adjust the widget size to the gauge.js library size		
		if (width > height) {
	 		return height/0.9;
	 	}
	 	return width/0.9;
	};
    
   
    widget.prototype.render = function () {
   		//emptying the node
    	$('>span', this.node).empty();
    	//defining the red and yellow zones for the gauge
		this.getZones();
		//creating the gauge attribute
		this.gauge = new Gauge(this.containerID, this.config);
    	//reconfiguring the gauge library with options
    	this.gauge.configure(this.config);
    	//rendering the gauge library
    	this.gauge.render();
    	//redrawing the gauge library with 'this'
    	this.gauge.redraw(this.value()); 
    };
 
 	//Adding a bindable property
   	widget.addProperty('value', {
   		'type' : 'number', 
   		'defaultValue' : 0 
   	});
 
 	//Adding non bindable properties
    widget.addProperty('displayname', { 
    	'defaultValue' : 'Gauge', 
    	'bindable' : false
    });
    
     widget.addProperty('minvalue', { 
        'type' : 'number',
    	'defaultValue' : 0, 
    	'bindable' : false
    });
 
    widget.addProperty('maxvalue', { 
        'type' : 'number',
    	'defaultValue' : 100, 
    	'bindable' : false
    });   	   	
 
	return widget;
});
=======
   /**
    * Creates the widget, automatically called by the framework.
    */
    widget.prototype.init = function () {

    	var myGauges,
    		that = this,
    		label,
    		size, 
    		min,
    		max,
    		width,
    		height,
    		$htmlElement;

    	//manage gauge size depending on widget size	
    	$htmlElement = $("#"+this.id);
    	width = parseInt($htmlElement.css("width"), 10);
    	height = parseInt($htmlElement.css("height"), 10);
    	size = width;			
		if (width > height) {
	 		size = height;
	 	}
    	size = size + 20;	

    	//set options values
		label 	= this.options.displayname || "Gauge";
    	min 	= parseInt(this.options.minvalue, 10) || 0;
    	max 	= parseInt(this.options.maxvalue, 10) || 100;
  
        $(this.node).empty();
        
        this.containerID = 'gaugeContainer'+this.id;

        myGauges  = document.createElement('span');
        myGauges.id = this.containerID;

        $(this.node).append(myGauges);
			
		function createGauge() {
			var config = {
				size: size,
				label: label,
				min: min,
				max: max,
				minorTicks: 5
			}
			
			var range = config.max - config.min;
			config.yellowZones = [{ from: config.min + range*0.75, to: config.min + range*0.9 }];
			config.redZones = [{ from: config.min + range*0.9, to: config.max }];
			
			that.gauges = new Gauge(that.containerID, config);
			that.gauges.render();
		}
		
		createGauge();

    };   

    /**
	 * allow to set the value of the gauge
	 * @class 
	 * @method value 
	 * @param {String} myValue Value of the data-binding property 
	 */
   	widget.prototype.value = function(myValue) { 
    	this.gauges.redraw(myValue); 
    };	

    widget.makeBindableProperty(widget.prototype.value);

})();
>>>>>>> 883a404ef4b3a2a90bdb5ddf0d48436f2434f8c4
