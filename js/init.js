/**
 * Moving effect
 */
$(function () {
	
	
	
    var defaultOptions = {
        moveEffect: 'blind'
        , moveEffectOptions: {
            direction: 'vertical'
        }
        , moveEffectSpeed: 'slow'
    };
    var widgets = {
        'simple': $.extend($.extend({}, defaultOptions), {
            sortMethod: 'normal'
            , sortable: true
        })
    };
    $.each(widgets, function (k, i) {
        $('#multiselect_' + k).multiselect(i).on('multiselectChange', function (evt, ui) {
            var values = $.map(ui.optionElements, function (opt) {
                return $(opt).attr('value');
            }).join(', ');
            $('#debug_' + k).prepend($('<div></div>').text('Multiselect change event! ' + (ui.optionElements.length == $('#multiselect_' + k).find('option').size() ? 'all ' : '') + (ui.optionElements.length + ' value' + (ui.optionElements.length > 1 ? 's were' : ' was')) + ' ' + (ui.selected ? 'selected' : 'deselected') + ' (' + values + ')'));
        }).on('multiselectSearch', function (evt, ui) {
            $('#debug_' + k).prepend($('<div></div>').text('Multiselect beforesearch event! searching for "' + ui.term + '"'));
        }).closest('form').submit(function (evt) {
            evt.preventDefault();
            evt.stopPropagation();
            $('#debug_' + k).prepend($('<div></div>').text("Submit query = " + $(this).serialize()));
            return false;
        });
        $('#btnSearch_' + k).click(function () {
            $('#multiselect_' + k).multiselect('search', $('#txtSearch_' + k).val());
        });
    });
});


function populateLabelsTable(url) {
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'text',
        success: function (data) {
            $("#multiselect_simple").html(data);
        },
        error: function (e) {
            console.log(e.message);
        }
    })
}

populateLabelsTable("../data/labels_selector.txt");
