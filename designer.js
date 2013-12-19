;(function(widget) {

    widget.setDescription('Gauge');
    
    /*Default size*/
    widget.setWidth('180');
    widget.setHeight('180');


    widget.on('resize', function(event) {

		this.config.size = this.fixSize();
		this.render();
		
    });

});