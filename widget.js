(function() {

    var Widget = WAF.require('waf-core/widget'),
    	widget = Widget.create('Gauge');

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