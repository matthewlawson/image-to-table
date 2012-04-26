/**
 * Matthew Lawson 25/04/12
 * www.mattyl.co.uk
 */
$(function(){
   onLoad();

});
function onLoad()
{
    pixel_width_form = document.getElementById('width_choose');
    pixel_width_form.addEventListener('submit', formSubmit, false)
    $('#use_demo').click(function()
    {
        $('.wrapper').show();
        $('#upload_wrapper').hide();
    });
    $('#use_upload').click(function(){
        $('.wrapper').hide();
        $('#upload_wrapper').show();
    });

    //Hijack image sumbit..
    $('#upload_image').submit(function(e)
    {
        e.preventDefault();
        //Do the submit via ajax.
        var field = document.getElementById('image_field');
        var form = document.getElementById('upload_image');

        var file = field.files[0];
        //console.log(file.type);
        if (file.type.match('image.*'))
        {

        //Check type + size etc..
            var reader = new FileReader();

      // Closure to capture the file information.
      //Hipster closure
            reader.onload = (function(theFile) {
                    return function(e) {
                        // Render thumbnail.
                        //console.log(e.target.result);

                        $('#demo_image').attr('src', e.target.result);
                        $('.wrapper').show();;
                    };
                })(file);

                // Read in the image file as a data URL.
            reader.readAsDataURL(file);
        //console.log(field.getFormData(), form.getFormData());

        }
        else
        {
            alert('Must be an image');
        }
    });
}

function formSubmit(e)
{
    e.preventDefault();
    sel_val = document.getElementById('pixelwidth');
    

    var pxSkip = parseInt(sel_val.options[sel_val.selectedIndex].value);
    
    //var pxSkip = 5;
    var canvas = document.getElementById('cv1');
    //console.log(canvas);
    var ctx = canvas.getContext('2d');

    var img = new Image();
    img.src = $('#demo_image').attr('src');
    img.onload = function()
    {
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img,0,0);
        //1 row first
        var tableHtml = '<table height="' + canvas.height + '" width="'+ canvas.width +'">';
        for (var j = 0; j < canvas.height; j+=pxSkip)
        {
            tableHtml += '<tr>';
            for(var i = 0; i < canvas.width; i+=pxSkip)
            {
                //getImage data is slow, change to be whole width of canvas & iterate that.
                imageData = ctx.getImageData(i,j,1,1).data;
                tableHtml += '<td style="background-color: rgb('+ imageData[0]+','+imageData[1]+','+imageData[2]+');"></td>'
                //console.log(imageData);
            }
            tableHtml += '</tr>';
        }

        tableHtml += '</tr></table>';

        generated = document.getElementById('generated');
        generated.innerHTML = tableHtml;




    }
}