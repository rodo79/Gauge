WAF.define('Gauge', function() {

    var Widget = WAF.require('waf-core/widget'),
    	widget = Widget.create('Gauge');

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

		//defining the red and yellow zones for the gauge
        this.getZones();
			
		//creating the gauge attribute 
		this.gauge = new Gauge(this.containerID, this.config);

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
        console.log(range);
		this.config.yellowZones = [{ from: this.config.min + range * 0.75, to: this.config.min + range*0.9 }];
		this.config.redZones = [{ from: this.config.min + range * 0.9, to: this.config.max }];
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
		//this.gauge = new Gauge(this.containerID, this.config);
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
