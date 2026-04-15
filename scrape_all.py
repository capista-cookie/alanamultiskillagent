#!/usr/bin/env python3
"""
Script to scrape officialskills.sh for complete skill data
"""

import json
import re
import time
import requests
from bs4 import BeautifulSoup
from typing import Dict, List, Optional
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_URL = "https://officialskills.sh"

def get_page_content(url: str) -> Optional[str]:
    """Fetch page content with retries"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    for attempt in range(3):
        try:
            response = requests.get(url, headers=headers, timeout=30)
            if response.status_code == 200:
                return response.text
            elif response.status_code == 404:
                return None
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            time.sleep(1)
    return None

def parse_skill_page(html: str, skill_id: str, publisher: str) -> Optional[Dict]:
    """Parse skill detail page to extract complete data"""
    soup = BeautifulSoup(html, 'html.parser')
    text = soup.get_text()

    # Extract category from the page
    category = None
    category_links = soup.find_all('a', href=re.compile(r'\?category='))
    for link in category_links:
        href = link.get('href', '')
        if 'category=' in href:
            category = href.split('category=')[-1].lower()
            break

    if not category:
        category = guess_category(skill_id)

    # Extract description (first paragraph after title)
    description = None
    # Look for the description in the text
    lines = text.split('\n')
    for i, line in enumerate(lines):
        if skill_id.replace('-', ' ') in line.lower() or line.strip() == skill_id:
            # Description is usually the next non-empty line
            for j in range(i+1, min(i+5, len(lines))):
                next_line = lines[j].strip()
                if next_line and len(next_line) > 10 and not next_line.startswith('View on GitHub'):
                    description = next_line
                    break
            break

    # Extract "What This Skill Does" section
    whatItDoes = []
    what_section_found = False

    for element in soup.find_all(['h2', 'h3', 'p']):
        text_content = element.get_text(strip=True)
        if 'What This Skill Does' in text_content or 'what this skill does' in text_content.lower():
            what_section_found = True
            continue
        if what_section_found:
            if text_content.startswith('›') or text_content.startswith('Show SKILL') or text_content.startswith('When to use it'):
                break
            if text_content.strip():
                whatItDoes.append(text_content)
            # Stop after a few elements
            if len(whatItDoes) > 10:
                break

    whatItDoes = ' '.join(whatItDoes).strip()

    # Extract "When to use it" items
    whenToUse = []
    when_section_found = False

    for element in soup.find_all(['p', 'li', 'span']):
        text_content = element.get_text(strip=True)
        if 'When to use it' in text_content:
            when_section_found = True
            continue
        if when_section_found:
            if text_content.startswith('›') or text_content.startswith('Show SKILL'):
                break
            if text_content.startswith('*') or text_content.startswith('•') or text_content.startswith('-'):
                item = text_content.lstrip('*•- ').strip()
                if item and len(item) > 5:
                    whenToUse.append(item)

    # Extract type (official vs community)
    skill_type = "official"
    # Check for community badge
    community_found = False
    official_found = False
    for tag in soup.find_all(['span', 'a', 'div']):
        tag_text = tag.get_text(strip=True).lower()
        if 'community' in tag_text:
            community_found = True
        if tag_text == 'official':
            official_found = True

    if community_found and not official_found:
        skill_type = "community"

    # Extract GitHub URL
    github_url = f"https://github.com/{publisher}/{skill_id}"
    install_command = f"npx skills add {github_url} --skill {skill_id}"

    # Get full description for the summary
    if not description:
        description = whatItDoes[:200] if whatItDoes else f"Skill for {skill_id}"

    # Clean up description
    description = re.sub(r'\s+', ' ', description).strip()
    if len(description) > 300:
        description = description[:300].rsplit(' ', 1)[0] + '...'

    # Clean up whatItDoes
    whatItDoes = re.sub(r'\s+', ' ', whatItDoes).strip()

    # Default whenToUse if empty
    if not whenToUse:
        whenToUse = [
            f"Working with {skill_id.replace('-', ' ')} functionality",
            f"Implementing {skill_id.replace('-', ' ')} features",
            f"Debugging {skill_id.replace('-', ' ')} related issues"
        ]

    # Generate skillMd
    skill_md_name = skill_id.replace('-', ' ').replace('_', ' ').title()

    return {
        "id": skill_id,
        "name": skill_id,
        "slug": skill_id,
        "publisher": publisher,
        "category": category,
        "type": skill_type,
        "description": description,
        "githubUrl": github_url,
        "installCommand": install_command,
        "whatItDoes": whatItDoes if whatItDoes else description,
        "whenToUse": whenToUse,
        "skillMd": f"""---
name: {skill_id}
description: {description}
---

# {skill_md_name}

{description}

## Overview

This skill provides specialized capabilities for working with {skill_id}.

## Usage

Use this skill when you need to:
{chr(10).join([f"- {item}" for item in whenToUse[:3]])}

## Best Practices

- Follow official documentation
- Use proper authentication
- Handle errors gracefully
- Test thoroughly before deployment
"""
    }

def guess_category(skill_id: str) -> str:
    """Guess category based on skill ID keywords"""
    skill_lower = skill_id.lower()

    # Security
    if any(k in skill_lower for k in ['security', 'keyvault', 'identity', 'content safety', 'auth0', 'mfa']):
        return 'security'
    # AI Tools
    elif any(k in skill_lower for k in ['azure-ai', 'openai', 'anthropic', 'gemini', 'hugging', 'ml', 'machine learning', 'agents-sdk', 'agents-v2']):
        return 'ai-tools'
    # Design
    elif any(k in skill_lower for k in ['design', 'ui', 'ux', 'frontend', 'figma', 'css', 'brand', 'accessibility', 'a11y', 'algorithmic-art']):
        return 'design'
    # Testing
    elif any(k in skill_lower for k in ['test', 'playwright', 'jest', 'cypress', 'testing']):
        return 'testing'
    # Docs
    elif any(k in skill_lower for k in ['doc', 'readme', 'markdown', 'agents-md', 'github-issue']):
        return 'docs'
    # Data
    elif any(k in skill_lower for k in ['data', 'db', 'database', 'storage', 'cosmos', 'sql', 'duckdb', 'postgres', 'mysql', 'redis']):
        return 'data'
    # Workflows
    elif any(k in skill_lower for k in ['workflow', 'chat', 'communication', 'email', 'sms', 'call', 'webhook']):
        return 'workflows'
    # Infrastructure
    elif any(k in skill_lower for k in ['infra', 'azure', 'cloud', 'compute', 'container', 'kubernetes', 'docker', 'event', 'servicebus', 'webpubsub', 'queue']):
        return 'infrastructure'
    else:
        return 'development'

def main():
    # Load existing skills.json
    print("Loading existing skills.json...")
    with open('/workspace/alanamultiskillagent/src/data/skills.json', 'r') as f:
        data = json.load(f)

    # Build list of skills to scrape
    skills_to_scrape = []
    for skill in data['skills']:
        publisher = skill.get('publisher', '')
        skill_id = skill.get('id')

        # Convert numeric ID to string if needed
        if isinstance(skill_id, int):
            skill_id = skill.get('name', '')

        if publisher and skill_id and isinstance(skill_id, str):
            skills_to_scrape.append({
                'url': f"{BASE_URL}/{publisher}/skills/{skill_id}",
                'publisher': publisher,
                'skill_id': skill_id
            })

    print(f"Found {len(skills_to_scrape)} skills to scrape")

    # Process skills in batches
    all_scrape_results = []
    batch_size = 50
    total = len(skills_to_scrape)

    for batch_start in range(0, total, batch_size):
        batch_end = min(batch_start + batch_size, total)
        batch = skills_to_scrape[batch_start:batch_end]

        print(f"\nProcessing batch {batch_start//batch_size + 1}/{(total + batch_size - 1)//batch_size}: skills {batch_start+1}-{batch_end}")

        for item in batch:
            print(f"  Scraping: {item['skill_id']} ({item['publisher']})")
            html = get_page_content(item['url'])

            if html:
                skill_data = parse_skill_page(html, item['skill_id'], item['publisher'])
                if skill_data:
                    all_scrape_results.append(skill_data)
                    print(f"    -> OK: {skill_data.get('category')}, {skill_data.get('type')}")
                else:
                    print(f"    -> Parse failed")
            else:
                print(f"    -> Not found (404)")

            time.sleep(0.2)  # Be nice to the server

    print(f"\n\nScraped {len(all_scrape_results)} skills successfully")

    # Create a lookup for scraped data
    scraped_lookup = {s['id']: s for s in all_scrape_results}

    # Update the original skills with correct data
    updated_count = 0
    for skill in data['skills']:
        skill_id = skill.get('id')
        if isinstance(skill_id, int):
            skill_id = skill.get('name', '')

        if skill_id in scraped_lookup:
            scraped = scraped_lookup[skill_id]

            # Update key fields
            skill['id'] = scraped['id']
            skill['name'] = scraped['name']
            skill['slug'] = scraped['slug']
            skill['publisher'] = scraped['publisher']
            skill['category'] = scraped['category']
            skill['type'] = scraped['type']
            skill['description'] = scraped['description']
            skill['githubUrl'] = scraped['githubUrl']
            skill['installCommand'] = scraped['installCommand']
            skill['whatItDoes'] = scraped['whatItDoes']
            skill['whenToUse'] = scraped['whenToUse']
            skill['skillMd'] = scraped['skillMd']

            updated_count += 1

    print(f"Updated {updated_count} skills in the dataset")

    # Save updated data
    output_path = '/workspace/alanamultiskillagent/src/data/skills.json'
    with open(output_path, 'w') as f:
        json.dump(data, f, indent=2)

    print(f"Data saved to {output_path}")

    # Also save scraped data separately for reference
    with open('/workspace/alanamultiskillagent/scraped_complete.json', 'w') as f:
        json.dump(all_scrape_results, f, indent=2)

    print(f"Scraped data saved to scraped_complete.json")

    # Print category summary
    category_counts = {}
    for skill in data['skills']:
        cat = skill.get('category', 'unknown')
        category_counts[cat] = category_counts.get(cat, 0) + 1

    print("\nCategory summary:")
    for cat, count in sorted(category_counts.items()):
        print(f"  {cat}: {count}")

if __name__ == "__main__":
    main()
