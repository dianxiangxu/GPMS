//For Effects
var timer_RB_effect = null;
var timer_LB_effect = null;
var timer_LT_effect = null;
var timer_RT_effect = null;
var is_RB_effect = true;
var is_LB_effect = true;
var is_LT_effect = true;
var is_RT_effect = true;

function startEffect( type, id, min, max ) {
	switch ( type ) {
		case 1: 
			// Right Bottom Effect
			if ( timer_RB_effect == null ) {
				timer_RB_effect = setInterval ( function() { animateEffect( type, id, min, max); }, 100 );
			}
			break;
		case 2: 
			// Left Bottom Effect
			if ( timer_LB_effect == null ) {
				timer_LB_effect = setInterval ( function() { animateEffect( type, id, min, max); }, 100 );
			}
			break;
		case 3: 
			// Left Top Effect
			if ( timer_LT_effect == null ) {
				timer_LT_effect = setInterval ( function() { animateEffect( type, id, min, max); }, 100 );
			}
			break;
		case 4: 
			//Right Top Effect
			if ( timer_RT_effect == null ) {
				timer_RT_effect = setInterval ( function() { animateEffect( type, id, min, max); }, 100 );
			}
			break;
	}
}

function animateEffect( type, id, min, max ) {
    var group = document.getElementById( id );
    var str = group.getAttribute( "transform" );
    var pos1 = str.lastIndexOf( "(" );
    var pos2 = str.lastIndexOf( " )" );
    str = str.slice( pos1 + 1, pos2 );
    var arr = str.split( " " );
    var rotate = 0;
    
    var isEffectLeft = false;
    var isLeft = true;
    
    switch ( type ) {
        case 1: 
			//Right Bottom Effect
            isEffectLeft = is_RB_effect;
            break;
        case 2: 
			//Left Bottom Effect
            isMinValueEffect = is_LB_effect;
            break;
        case 3: 
			//Left Top Effect
            isMinValueEffect = is_LT_effect;
            break;
        case 4: 
			//Right Top Effect
            isMinValueEffect = is_RT_effect;
            break;
    }
    
    if ( true === isMinValueEffect) {
        rotate = 1 + parseInt( arr[ 0 ] );
        if ( rotate > max ) {
            rotate = max;
            isMinValueEffect = false;
        }
    } else {
        rotate = -1 + parseInt( arr[ 0 ] );
        if ( rotate < min ) {
            rotate = min;
            isMinValueEffect = true;
        }
    }    
    
    switch ( type ) {
        case 1: //Right Bottom Effect
            is_RB_effect = isMinValueEffect;
            break;
        case 2: //Left Bottom Effect
            is_LB_effect = isMinValueEffect;
            break;
        case 3: //Left Top Effect
            is_LT_effect = isMinValueEffect;
            break;
        case 4: //Right Top Effect
            is_RT_effect = isMinValueEffect;
            break;
    }
    str = "rotate(" + String(rotate) + " " + arr[ 1 ] + " " + arr[ 2 ] + " )";
    group.setAttribute( "transform", str );
}