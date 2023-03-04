---
layout: base.njk
---
<h1 class="text-3xl font-bold underline">{{ title }}</h1>

<aside>
{{ date | date: "%Y-%m-%d" }}
{% if tags.length > 1 -%} in <ul class="tags">
{% for tag in tags -%}
{% if tag != 'post' -%}
    <li>{{ tag }}</li>
{%- endif %}
{%- endfor %}
</ul>
</aside>
{% endif %}

{{ content }}
