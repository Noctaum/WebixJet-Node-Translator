# Task 1 
## Webix-poject
### Webix Jet + Node.js + express + mongoDB

---

## Things, which need to be in a test app, to grok the Webix:

1. Server side - any language, but must present, data must be loaded and saved from|to DB (1)
2. Single page app, one page, without reloading + (2)
3. Sidebar for navigation +(3)

4. Screen with editable datatable (dataset A) (4)
	* 4.1 Client side sorting and filtering + (4.1)
	* 4.2 Clicking on row shows the popup form which allows to edit record in DB (4.2)
	* 4.3 Toolbar with “export to excel” and “refresh” buttons +(4.3)
	* 4.4 Data in table must fill the whole screen +(4.4)

5. Screen with editable datatable for some entity (dataset B)(5)
	* 5.1 Datatable uses dynamic loading to load extra records from server side +(5.1)
	* 5.2 Server side sorting and table +(5.2)
	* 5.3 Inline editors +(5.3)

6. Screen which contains a list of record and linked datatable(6)
	* 6.1 Data in list is taken from dataset A ( see above )(6.1) 
	* 6.2 Datatable shows info related to the record selected in the list (6.2)
	* 6.3 Datatable have inline editors  (6.3)
	* 6.4 After selecting the row in datatable, next to it shown a template with even more info ( for example, list - categories, datatable - files, template - preview ) (6.4)

7. Screen with a complex form ( settings form example ) (7)
	* 7.1 Two column layout for the form + (7.1)
	* 7.2 Add file uploading functionality +(7.2)
	* 7.3 Use multi combo widget in the form +(7.3) to delete
	* 7.4 Use select in the form, with data from dataset A+(7.4)
	* 7.5 Use grid as part of the form (7.5) 
	* 7.6 On checking some checkbox, form sets different set of controls+(7.6)

---

## Topics covered by above app:
- Navigation
- Multiviews
- Layouts
- Sizing
- Data loading
- Data saving
- Dynamic data loading
- Popups
- Forms
- Data binding
- Common datasets
- Templates
- On-change view refreshing
- File uploading

