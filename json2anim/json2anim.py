import json

def json2anim(json_path,group_name):

    parsed = json.loads(open(json_path).read())
    js_out = ""

    #js_out += 'var {} = new BABYLON.AnimationGroup("{}");\n'.format(group_name,group_name)
    for animation in parsed["animations"]:
        name = animation["name"]
        property = animation["property"]
        fps = animation["framePerSecond"]
        data = animation["dataType"]
        loopBehavior = animation["loopBehavior"]
        blendingSpeed = animation["blendingSpeed"]
        keys = animation["keys"]
        ranges = animation["ranges"]
        # js_out += f'var {name} = new BABYLON.Animation("{name}","{property}",{fps},{data},{loopBehavior});\n'
        
        js_out += f'{name}.setKeys([\n'
        for key in keys:
            frame = key["frame"]
            all_values = key["values"]
            values = [round(v,3) for v in all_values[0:3]]
            if property in ["rotation","position"]:
                js_out += f"    {{ frame: {frame}, value: new BABYLON.Vector3({values[0]},{values[1]},{values[2]}),\n"
            else:
                print("cannot parse property")
                break
            has_in_tangents = len(all_values) >= 4
            if has_in_tangents and all_values[3] is not None:
                in_tangents = [round(v,3) for v in all_values[3]]
                js_out += f"            inTangent: new BABYLON.Vector3({in_tangents[0]},{in_tangents[1]},{in_tangents[2]}),\n"
            has_out_tangents = len(all_values) > 4
            if has_out_tangents and all_values[4] is not None:
                    out_tangents = [round(v,3) for v in all_values[4]]
                    js_out += f"            outTangent: new BABYLON.Vector3({out_tangents[0]},{out_tangents[1]},{out_tangents[2]}),\n"

            js_out+= f'}},\n'

        nn = name.split("_")
        prefix = nn[0]
        anim = nn[1]
        nn[2:] = [v.title() for v in nn[2:]]
        target = prefix+"_"+"".join(nn[2:])
        js_out += ']);\n'
        # js_out += f'{group_name}.addTargetedAnimation({name},player.scene.getNodeById("{target}"));\n\n\n'
    return js_out

js_out = json2anim("./pain.json","p_pain_anim")

print(js_out)