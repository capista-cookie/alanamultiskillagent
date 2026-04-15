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
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            time.sleep(1)
    return None

def parse_skill_page(html: str, skill_id: str, publisher: str) -> Optional[Dict]:
    """Parse skill detail page to extract complete data"""
    soup = BeautifulSoup(html, 'html.parser')

    # Find the main content area
    text = soup.get_text()

    # Extract category from the page
    category = None
    category_pattern = re.search(r'\["?category"?=?"?(\w+)', html)
    if category_pattern:
        category = category_pattern.group(1).lower()

    # Look for category link in the breadcrumb
    category_links = soup.find_all('a', href=re.compile(r'\?category='))
    for link in category_links:
        href = link.get('href', '')
        if 'category=' in href:
            category = href.split('category=')[-1].lower()
            break

    # If no category found, try text matching
    if not category:
        categories = ['infrastructure', 'development', 'ai-tools', 'workflows',
                    'security', 'data', 'design', 'docs', 'testing']
        for cat in categories:
            if cat in text.lower():
                category = cat
                break

    # Extract description
    description = None
    desc_pattern = re.search(r'Audits and improves.*?(?=View on GitHub|$)', text, re.DOTALL)
    if desc_pattern:
        description = desc_pattern.group(0).strip()

    # Extract "What This Skill Does" section
    whatItDoes = None
    what_section = None

    # Try to find the section header and content
    h2_tags = soup.find_all('h2')
    for h2 in h2_tags:
        if 'What This Skill Does' in h2.get_text():
            # Get all siblings until next h2
            content_parts = []
            for sibling in h2.find_next_siblings():
                if sibling.name == 'h2':
                    break
                content_parts.append(sibling.get_text(strip=True))
            what_section = '\n\n'.join(content_parts)
            break

    if not what_section:
        # Try regex pattern
        what_match = re.search(r'What This Skill Does\s*[-─]+\s*(.+?)(?=\n\n### When to use it|\n\n›|\n{3,})', text, re.DOTALL)
        if what_match:
            what_section = what_match.group(1).strip()

    # Extract "When to use it" items
    whenToUse = []

    # Find all bullet points in the "When to use it" section
    when_section_found = False
    for element in soup.find_all(['p', 'li', 'span']):
        text_content = element.get_text(strip=True)
        if 'When to use it' in text_content:
            when_section_found = True
            continue
        if when_section_found:
            # Stop at next section
            if text_content.startswith('›') or text_content.startswith('Show SKILL'):
                break
            # Bullet point
            if text_content.startswith('*') or text_content.startswith('•') or text_content.startswith('-'):
                item = text_content.lstrip('*•- ').strip()
                if item:
                    whenToUse.append(item)

    # Fallback: try to extract from text directly
    if not whenToUse:
        when_match = re.search(r'When to use it\s*[-─]+\s*((?:[•*-] .+\n?)+)', text, re.DOTALL)
        if when_match:
            items = re.findall(r'[•*-] (.+)', when_match.group(1))
            whenToUse = [item.strip() for item in items if item.strip()]

    # Extract publisher name
    publisher_name = None
    publisher_link = soup.find('a', href=re.compile(r'/skills'))
    if publisher_link:
        publisher_name = publisher_link.get_text(strip=True)

    # Extract install command
    install_command = f"npx skills add https://github.com/{publisher}/{skill_id} --skill {skill_id}"

    # Extract GitHub URL
    github_url = f"https://github.com/{publisher}/{skill_id}"

    # Determine type (official vs community)
    skill_type = "official"
    if '/community/' in html or 'community' in html.lower():
        # Check if it's actually community by looking at the type badge
        official_badge = soup.find(text=re.compile(r'official', re.IGNORECASE))
        if not official_badge:
            skill_type = "community"

    # If no category detected, use default based on publisher
    if not category:
        category = guess_category(skill_id)

    return {
        "id": skill_id,
        "name": skill_id,
        "slug": skill_id,
        "publisher": publisher,
        "category": category or "development",
        "type": skill_type,
        "description": description or f"Skill for {skill_id}",
        "githubUrl": github_url,
        "installCommand": install_command,
        "whatItDoes": what_section or description or f"Provides capabilities for {skill_id}",
        "whenToUse": whenToUse if whenToUse else [
            f"Working with {skill_id}",
            f"Implementing {skill_id} functionality"
        ],
        "skillMd": f"""---
name: {skill_id}
description: {description or f"Skill for {skill_id}"}
---

# {skill_id.replace('-', ' ').title()}

{description or f"Provides capabilities for {skill_id}"}

## Overview

This skill helps AI agents work with {skill_id}.

## Usage

Use this skill when you need to:
- Implement {skill_id} functionality
- Work with {skill_id} APIs
- Debug {skill_id} related issues

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

    if any(k in skill_lower for k in ['security', 'keyvault', 'identity', 'content safety']):
        return 'security'
    elif any(k in skill_lower for k in ['azure', 'ai', 'ml', 'openai', 'anthropic', 'gemini']):
        return 'ai-tools'
    elif any(k in skill_lower for k in ['design', 'ui', 'ux', 'frontend', 'figma', 'css']):
        return 'design'
    elif any(k in skill_lower for k in ['test', 'playwright', 'jest', 'cypress']):
        return 'testing'
    elif any(k in skill_lower for k in ['doc', 'readme', 'markdown', 'api']):
        return 'docs'
    elif any(k in skill_lower for k in ['data', 'db', 'database', 'storage', 'cosmos', 'sql']):
        return 'data'
    elif any(k in skill_lower for k in ['workflow', 'chat', 'communication', 'email', 'sms']):
        return 'workflows'
    elif any(k in skill_lower for k in ['infra', 'azure', 'cloud', 'compute', 'container', 'kubernetes']):
        return 'infrastructure'
    else:
        return 'development'

def main():
    # Load existing skills.json
    with open('/workspace/alanamultiskillagent/src/data/skills.json', 'r') as f:
        data = json.load(f)

    # Get list of skill URLs to scrape
    skills_to_scrape = []
    for skill in data['skills']:
        publisher = skill.get('publisher', '')
        skill_id = skill.get('id')

        # Convert numeric ID to string if needed
        if isinstance(skill_id, int):
            skill_id = skill.get('name', '')

        if publisher and skill_id:
            skills_to_scrape.append({
                'url': f"{BASE_URL}/{publisher}/skills/{skill_id}",
                'publisher': publisher,
                'skill_id': skill_id
            })

    print(f"Found {len(skills_to_scrape)} skills to scrape")

    # Scrape first 10 skills as test
    scraped_data = []
    for item in skills_to_scrape[:10]:
        print(f"Scraping: {item['url']}")
        html = get_page_content(item['url'])
        if html:
            skill_data = parse_skill_page(html, item['skill_id'], item['publisher'])
            if skill_data:
                scraped_data.append(skill_data)
                print(f"  -> Success: {skill_data.get('category')}, {skill_data.get('type')}")
        time.sleep(0.5)  # Be nice to the server

    # Save scraped data
    with open('/workspace/alanamultiskillagent/scraped_skills.json', 'w') as f:
        json.dump(scraped_data, f, indent=2)

    print(f"\nScraped {len(scraped_data)} skills")
    print("Data saved to scraped_skills.json")

if __name__ == "__main__":
    main()
