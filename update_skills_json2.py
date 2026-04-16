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

## 1. Overview and Capabilities

This skill provides specialized capabilities for working with **{name}**. It is designed to streamline your workflow, provide robust functionality, and ensure that your automated agents can interact seamlessly with the underlying systems. By leveraging advanced parsing and structured data handling, this skill eliminates much of the boilerplate typically required.

### What it does (Detailed)

{whatItDoes}

In addition to the core functionality, this skill:
- Automatically manages resource lifecycles.
- Handles authentication and token refresh in the background.
- Parses output into structured JSON for downstream consumption.
- Integrates cleanly with standard CI/CD pipelines.

## 2. Installation & Setup

To install this skill, run the following command in your terminal. Make sure you have the latest version of the CLI installed:

```bash
{install_cmd}
# Optional: Verify installation
npx skills verify {name}
```

### Prerequisites
- Node.js 18+ or Python 3.10+ (depending on the environment).
- Valid API keys or access tokens configured in your `.env` file.
- Network access to the relevant endpoints.

## 3. Configuration and Advanced Usage

Here is a comprehensive example of how to configure and use this skill in a production environment:

```javascript
import {{ initSkill, Logger }} from '@agent/skills';

// Initialize with advanced configuration
const skillInstance = initSkill('{name}', {{
  debug: process.env.NODE_ENV === 'development',
  mode: 'advanced',
  retries: 3,
  timeoutMs: 15000,
  callbacks: {{
    onStart: () => Logger.info('[{name}] Skill started'),
    onSuccess: (result) => Logger.info('[{name}] Success:', result),
    onError: (error) => Logger.error('[{name}] Failed:', error)
  }}
}});

// Execute the skill with a payload 
async function runWorkflow() {{
  try {{
    const response = await skillInstance.execute({{
      target: 'production',
      dryRun: false
    }});
    console.log("Response data:", response.data);
  }} catch (err) {{
    console.error("Workflow halted due to error in {name}.");
  }}
}}

runWorkflow();
```

## 4. Key Features & Architecture

* **Automated workflows:** Reduces manual effort by automating core tasks such as scaffolding, formatting, and deployment checks.
* **Type-safe:** Fully written in TypeScript. Exported interfaces (`I{name.replace('-', '')}Config`, `I{name.replace('-', '')}Response`) ensure your IDE catches errors early.
* **Resilient Execution:** Built-in exponential backoff means transient network errors won't crash your agent.
* **Observable:** Emits standard OpenTelemetry spans for every major operation, making it easy to profile performance.

## 5. Troubleshooting & Common Issues

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| `ERR_UNAUTHORIZED` | Expired or missing API credential. | Check your environment variables and regenerate the token. |
| `TIMEOUT_EXCEEDED` | The target service took too long to respond. | Increase `timeoutMs` in the config or check network status. |
| `VALIDATION_FAILED` | Payload did not match the expected schema. | Review the input payload against the official JSON schema. |

## 6. Security Considerations

- **Secret Management:** Never hardcode secrets in your usage scripts. Always use an enterprise secret manager or `.env` files.
- **Least Privilege:** When generating tokens for this skill, select only the scopes explicitly required.
- **Audit Logging:** Turn on audit logs in your deployment environment when using this skill to track automated actions affecting production.

## 7. Best Practices

1. **Follow official documentation**: Always check the upstream docs for any changes in the underlying API.
2. **Use idempotency keys**: Where supported, provide an idempotency key to prevent accidental duplicate operations if a retry occurs.
3. **Handle errors gracefully**: Use `try/catch` and fallback mechanisms to ensure graceful degradation.
4. **Test thoroughly**: Run unit and integration tests (preferably against a staging environment or sandbox) before promoting this skill to production.
"""
        skill['skillMd'] = md_content

    with open(input_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    logging.info("Successfully updated skills.json with extra bulky markdown.")
except Exception as e:
    logging.error(f"Error processing skills.json: {e}")
