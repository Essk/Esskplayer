/**
 * Created by sarah on 13/08/15.
 */
/*append some additional elements for control and viewing*/
function mkUpExtras(){

    var checkPosition = function(child){
        var i = 0;
        while( (child = child.previousSibling) != null ){
            i++;
        }
        return i;
    };

    var vimeo_ext_container = document.createElement('div');
    vimeo_ext_container.id = 'extra-container';
    var vimeo_vol_container = document.createElement('div');
    vimeo_vol_container.id = 'vol-container';
    var vimeo_hd_contr = document.createElement('div');
    vimeo_hd_contr.id = 'hd-control';
    var vimeo_fs_cont = document.createElement('div');
    vimeo_fs_cont.id = 'fs-control';

    for (var i = 0; i < 5; i ++){
        var vol_bar = document.createElement('div');
        vol_bar.classList.add('vol-bar');
        vimeo_vol_container.appendChild(vol_bar);
        vol_bar.addEventListener('mouseenter', function() {
            var parent = this.parentElement;
            if(!this.classList.contains('active')){
                for (var j = 0; j < parent.childNodes.length; j++) {
                    if (j <= checkPosition(this)){
                        parent.childNodes[j].classList.add('active');
                    } else {
                        parent.childNodes[j].classList.remove('active');
                    }
                }

            }else{
                for (var j = 0; j < parent.childNodes.length; j++) {
                    if (j < checkPosition(this)){
                        parent.childNodes[j].classList.add('active');
                    } else {
                        parent.childNodes[j].classList.remove('active');
                    }
                }
            }

        });

      // vol_bar.addEventListener('mouseleave', function(){this.classList.toggle('active')});
    }


    vimeo_ext_container.appendChild(vimeo_vol_container);
    vimeo_ext_container.appendChild(vimeo_hd_contr);
    vimeo_ext_container.appendChild(vimeo_fs_cont);

    return vimeo_ext_container;
}

function mkUpSocial(){
    var vimeo_soc_container = document.createElement('div');
    vimeo_soc_container.id = 'social-container';

    var vimeo_like_box = document.createElement('div');
    vimeo_like_box.className = 'social-box';
    var vimeo_like = document.createElement('div');
    vimeo_like.id = 'like';

    vimeo_like.className = 'social';
    var vimeo_like_label = document.createElement('div');
    vimeo_like_label.classList.add('social-label', 'hidden');
    vimeo_like_label.innerHTML = '<span>Like</span>';

    var vimeo_later_box = document.createElement('div');
    vimeo_later_box.className = 'social-box';
    var vimeo_later = document.createElement('div');
    vimeo_later.id = 'later';
    vimeo_later.className = 'social';
    var vimeo_later_label = document.createElement('div');
    vimeo_later_label.classList.add('social-label', 'hidden');
    vimeo_later_label.innerHTML = '<span>Add to Watch Later</span>';

    var vimeo_share_box = document.createElement('div');
    vimeo_share_box.classList.add('social-box');
    var vimeo_share = document.createElement('div');
    vimeo_share.id = 'share';
    vimeo_share.className = 'social';
    var vimeo_share_label = document.createElement('div');
    vimeo_share_label.classList.add('social-label', 'hidden');
    vimeo_share_label.innerHTML = '<span>Share</span>';


    vimeo_like.addEventListener('mouseover', function(){vimeo_like_label.classList.toggle('hidden')});
    vimeo_like.addEventListener('mouseleave', function(){vimeo_like_label.classList.toggle('hidden')});

    vimeo_later.addEventListener('mouseover', function(){vimeo_later_label.classList.toggle('hidden')});
    vimeo_later.addEventListener('mouseleave', function(){vimeo_later_label.classList.toggle('hidden')});

    vimeo_share.addEventListener('mouseover', function(){vimeo_share_label.classList.toggle('hidden')});
    vimeo_share.addEventListener('mouseleave', function(){vimeo_share_label.classList.toggle('hidden')});

    vimeo_like_box.appendChild(vimeo_like_label);
    vimeo_like_box.appendChild(vimeo_like);


    vimeo_later_box.appendChild(vimeo_later_label);
    vimeo_later_box.appendChild(vimeo_later);


    vimeo_share_box.appendChild(vimeo_share_label);
    vimeo_share_box.appendChild(vimeo_share);

    vimeo_soc_container.appendChild(vimeo_like_box);
    vimeo_soc_container.appendChild(vimeo_later_box);
    vimeo_soc_container.appendChild(vimeo_share_box);

    return vimeo_soc_container;
}





