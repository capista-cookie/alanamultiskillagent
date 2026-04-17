import json

with open('src/data/openClaw/skills.json', 'r', encoding='utf-8') as f:
    openclaw_data = json.load(f)

with open('src/data/skills.json', 'r', encoding='utf-8') as f:
    main_data = json.load(f)

# Need to make sure publisher 'OpenClaw' is in the publishers list
publishers = main_data.get('publishers', [])
if not any(p.get('id') == 'OpenClaw' for p in publishers):
    publishers.append({
        "id": "OpenClaw",
        "name": "OpenClaw",
        "avatar": "/openClaw.jpg",
        "twitter": "",
        "github": ""
    })
    main_data['metadata']['totalPublishers'] += 1

new_skills = []
for sk in openclaw_data.get('skills', []):
    github_url = sk.get('github_url', '')
    github_url = github_url.replace('Demerzels-lab', 'cookie-may').replace('elsamultiskill', 'alanamultiskillagent')
    
    new_sk = {
        "id": sk.get("slug"),
        "name": sk.get("name"),
        "slug": sk.get("slug"),
        "publisher": "OpenClaw",
        "category": "community",
        "type": "community",
        "description": sk.get("description", ""),
        "githubUrl": github_url,
        "installCommand": sk.get("install_command", ""),
        "whatItDoes": sk.get("description", ""),
        "whenToUse": [
             f"Working with {sk.get('name')} functionality",
             f"Implementing {sk.get('name')} features"
        ],
        "skillMd": f"---\nname: {sk.get('name')}\ndescription: {sk.get('description', '')}\n---\n\n# {sk.get('name')}\n\n{sk.get('description', '')}\n"
    }
    
    # Avoid duplicates? (Just in case)
    if not any(s.get('id') == new_sk['id'] for s in main_data['skills']):
        new_skills.append(new_sk)

main_data['skills'].extend(new_skills)
main_data['metadata']['totalSkills'] = len(main_data['skills'])

with open('src/data/skills.json', 'w', encoding='utf-8') as f:
    json.dump(main_data, f, indent=2)

