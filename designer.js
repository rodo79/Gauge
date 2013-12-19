<<<<<<< HEAD
;(function(widget) {
=======
;(function() {

    var widget = Widget.Gauge.inherit(WAF.require('waf-behavior/studio'));
>>>>>>> 883a404ef4b3a2a90bdb5ddf0d48436f2434f8c4

    widget.setDescription('Gauge');
    
    /*Default size*/
    widget.setWidth('180');
    widget.setHeight('180');

<<<<<<< HEAD

    widget.on('resize', function(event) {

		this.config.size = this.fixSize();
		this.render();
		
    });

});
=======
	/*Properties*/
    widget.addAttributes([{
        'name': 'data-binding',
        'description': 'Source',
        'typeValue': 'datasource'
    },{
        'name': 'data-displayname',
        'description': 'Name',
        'typeValue': 'string',
        'defaultValue': 'Gauge' 
    },{
        'name': 'data-minvalue',
        'description': 'Min value',
        'typeValue': 'number',
        'defaultValue': 0 
    },{
        'name': 'data-maxvalue',
        'description': 'Max value',
        'typeValue': 'number',
        'defaultValue': 100
    }]);


    widget.on('resize', function(event) {

		var width = event.size.width,
			height = event.size.height,
			size;

		size = width;		

		if (width > height) {
			size = height;
		}	

		this.options.size  = size + 20;
    });

    widget.on('display', function(attributes) {

    	var that = this;

    	this.options.displayname 	= attributes["data-displayname"];
    	this.options.maxvalue  		= attributes["data-maxvalue"];
    	this.options.minvalue  		= attributes["data-minvalue"];

    	window.setTimeout(function(){
    		that.init();
    	}, 0);
    	
    });
})();
>>>>>>> 883a404ef4b3a2a90bdb5ddf0d48436f2434f8c4
