(function( $ ) {
    $.fn.simpleSelect = function() {

        function createSelectors(elem){
            var parent = elem;
            var parentOptions = elem.find("option");
            var name = parent.attr("name");
            var newSS = document.createElement("div");
            var newSS_display = document.createElement("div");
            var newSS_active = document.createElement("div");
            var newSS_options = document.createElement("div");
            newSS.classList.add("ss-container");
            $(newSS).attr("data-name", name);
            $(newSS).attr("data-selected", "");
            newSS_display.classList.add("ss-display");
            newSS_active.classList.add("ss-active");
            newSS_options.classList.add("ss-options");
            newSS_display.appendChild(newSS_active);
            newSS.appendChild(newSS_display);
            newSS.appendChild(newSS_options);
            $(newSS).insertAfter(elem);
            $(parentOptions).each( function(){
                createOption( $(this), newSS_options );
            } );
            setValue(0, newSS);
            elem.hide();
        }

        function createOption(elem, container){
            var content = elem.html();
            var value = elem.val();
            var newSS_option = document.createElement("div");
            newSS_option.classList.add("ss-options-item");
            $(newSS_option).attr("data-value", value);
            $(newSS_option).html(content);
            container.append(newSS_option);
        }

        function setValue(x, select) {

            var option = $(select).find(".ss-options-item");
            var display = $(select).find(".ss-active");
            var selval;

            if ( Number.isInteger(x) ) {
                var val = option.eq(x).html();
                selval = option.eq(x).attr('data-value');
            } else {
                val = $(select).find('[data-value="' + x + '"]').html();
                selval = x;
            }
            $(display).html(val);
            $(select).attr("data-selected", selval);
        }

        this.each(function(){
            createSelectors( $(this) )
        });

        $(".ss-display").click(function(){
            $(this).parent().toggleClass("opened")
        });

        $(".ss-options-item").click(function(){
            var ss = $(this).closest('.ss-container');
            var value = $(this).attr("data-value");
            var name = $(ss).attr('data-name');
            setValue(value, ss);
            $(ss).removeClass("opened");
            $('[name="' + name + '"]').val( value );
        });

        $("select").change(function(){
            var name = $(this).attr('name');
            setValue( $(this).val(), $('[data-name="' + name + '"]') )
        });

    };
})(jQuery);

