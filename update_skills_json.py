import json
import logging

logging.basicConfig(level=logging.INFO)

input_path = "c:/Danann/1. Projects/1. Web Development/next JS/WP/2026/alanamultiskillagent/src/data/skills.json"
try:
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for skill in data.get('skills', []):
        name = skill.get('name', 'Unknown Skill')
        desc = skill.get('description', '')
        whatItDoes = skill.get('whatItDoes', desc)
        install_cmd = skill.get('installCommand', f"npx skills add {name}")
        
        md_content = f"""---
name: {name}
description: {desc}
---

# {name.title()}

{desc}

## Overview

This skill provides specialized capabilities for working with **{name}**. It is designed to streamline your workflow and provide robust functionality.

### What it does

{whatItDoes}

## Installation

To install this skill, run the following command in your terminal:

```bash
{install_cmd}
```

## Usage Example

Here is a quick example of how to configure and use this skill:

```javascript
import {{ initSkill }} from '@agent/skills';

const myAgent = initSkill('{name}', {{
  debug: true,
  mode: 'advanced'
}});

// Execute the skill
myAgent.start();
```

## Key Features

* **Automated workflows:** Reduces manual effort by automating core tasks.
* **Type-safe:** Fully written in TypeScript for better developer experience.
* **Seamless Integration:** Works out of the box with your existing agent setup.

## Best Practices

1. **Follow official documentation**: Always check the latest docs for updates.
2. **Use proper authentication**: Secure your API keys and tokens to avoid leaks.
3. **Handle errors gracefully**: Implement `try/catch` and fallback mechanisms.
4. **Test thoroughly**: Run unit and integration tests before deployment.
"""
        skill['skillMd'] = md_content

    with open(input_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    logging.info("Successfully updated skills.json with bulky markdown.")
except Exception as e:
    logging.error(f"Error processing skills.json: {e}")
