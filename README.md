# Web Development Project 5 - _Recipe Dashboard_

Submitted by: **Md Arafat**

This web app: **A recipe dashboard that fetches recipes from the Recipe API and lets users search by name and filter by cuisine. It also displays summary statistics and recipe details in a responsive card grid.**

Time spent: **2** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard displays 10 unique recipes, one per card
  - Each recipe card shows the cuisine, meal type, difficulty, total time, and calories
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data**
  - Total recipes
  - Average total time
  - Average calories per serving
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar filters recipes by name
  - The list of results updates dynamically as the user types
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The cuisine filter uses a different attribute than the recipe name search
  - The filter only displays recipes matching the selected cuisine
  - The dashboard list updates dynamically when the filter changes

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - A text input for search and a dropdown for cuisine
- [ ] The user can enter specific bounds for filter values

## Video Walkthrough

Here's a walkthrough of the implemented user stories:

[Watch the walkthrough video](./src/assets/walkthrough.mp4)

## License

Copyright 2026 Md Arafat

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
