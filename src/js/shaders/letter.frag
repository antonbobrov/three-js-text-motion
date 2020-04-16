#ifdef USE_MAP

    vec2 uv = vUv;



    float minGradient = uInnerRadius * 0.3;
    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;

    float gradient = uRadius * 0.3;
    float radius = (uRadius - gradient * 0.5) / filterArea.x;

    float countLimit = MAX_KERNEL_SIZE;

    vec2 dir = vec2(uCenter.xy / filterArea.xy - uv);
    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));

    float strength = uStrength;

    float delta = 0.0;
    float gap;
    if (dist < innerRadius) {
        delta = innerRadius - dist;
        gap = minGradient;
    } 
    // else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity
    //     delta = dist - radius;
    //     gap = gradient;
    // }

    // if (delta > 0.0) {
    //     float normalCount = gap / filterArea.x;
    //     delta = (normalCount - delta) / normalCount;
    //     countLimit *= delta;
    //     strength *= delta;
    //     if (countLimit < 1.0)
    //     {
    //         gl_FragColor = texture2D(map, uv);
    //         return;
    //     }
    // }

    // randomize the lookup values to hide the fixed number of samples
    float offset = randK(uv, 0.0);

    float total = 0.0;
    vec4 color = vec4(0.0);

    dir *= strength;

    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {
        float percent = (t + offset) / MAX_KERNEL_SIZE;
        float weight = 4.0 * (percent - percent * percent);
        vec2 p = uv + dir * percent;
        vec4 sample = texture2D(map, p);

        // switch to pre-multiplied alpha to correctly blur transparent images
        // sample.rgb *= sample.a;

        color += sample * weight;
        total += weight;

        if (t > countLimit){
            break;
        }
    }

    color /= total;
    // switch back from pre-multiplied alpha
    // color.rgb /= color.a + 0.00001;
    
	color = mapTexelToLinear( color );
	diffuseColor *= color;








    
	// vec4 texelColor = texture2D( map, vUv );
	// texelColor = mapTexelToLinear( texelColor );
	// diffuseColor *= texelColor;

#endif