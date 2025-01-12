Welcome to NoteMaster, a chorme extension that lets you add notes to sections on what ever page you are reading.
You can switch between having notes overalayed or having them in a sidebar view.
This extension is a MVP, not available on the extension store and has some limitations.

How to run:
Requirements
  - Node.js and npm
  - Typescript
  - chrome browser

How to run:
  - Clone repository
  - run `npm i`
  - run `npm build`
  - open chrome browser
  - At the top right open the settings menu
  - Select Extensions->Manage Extensions
   ![extension menu](https://github.com/user-attachments/assets/16988faf-62ef-4400-a676-517ac1a76190)

  - At the top right select developer mode
  - At the top left select `Load unpacked`
    ![extension view](https://github.com/user-attachments/assets/3a55b0d8-52ce-4572-a776-699e6f9d8fdf)

  - Navigate to the NoteMaster local repository and select the `dist` folder

How to use:
  - Navigate to a google api page such as : https://developer.chrome.com/docs/extensions/reference/api
  - Select a paragraph you would like to add a note to, right click->CreateNote
  - This will create a new Note where you can enter your text and display it in the sidebar view.
    ![create note context menu](https://github.com/user-attachments/assets/25e9a20d-b44a-46d6-bb89-ea7bc0e1ada6)

  - With nothing on the page selected, right click->Notemaster you can switch between side bar view and overlay view.
    ![sidebarView](https://github.com/user-attachments/assets/f636ee88-0242-47c4-a9a4-c155f611bf16)

  - To hide notes in the overlay mode just hit the green button next to the note or right click->NoteMaster->Hide notes/Show notes
  - To delete any note just hit the red button next to the note and will be deleted.
  - ![overlay](https://github.com/user-attachments/assets/d2bd7f7a-e5ac-4fd7-9570-cd62bae9cdf6)
