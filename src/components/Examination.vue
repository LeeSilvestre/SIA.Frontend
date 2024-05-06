<template>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="displayedStudents"
      :sort-by="[{ key: 'studentId', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            class="w-auto mr-4"
            density="compact"
            label="Search Exam"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
            style="max-width: 500px;"
          ></v-text-field>
          
          <v-dialog v-model="dialog" max-width="1000px">
    <template v-slot:activator="{ props }">
      <v-btn @click="openDialog" class="mb-2 rounded-l" color="primary" dark v-bind="props" prepend-icon="mdi-plus">New Exam Record</v-btn>
    </template>
            
    <v-card>
      <v-card-title><span class="text-h6 m-2" style="color: #2F3F64"></span>New Exam Record</v-card-title>
      <v-card-text>
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="editedItem.student_id" label="Student ID*" prepend-icon="mdi-account" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="editedItem.title" label="Enter Record Title" prepend-icon="mdi-pencil" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="editedItem.score" label="Score" prepend-icon="mdi-folder" required></v-text-field>
            </v-col>
            <v-file-input v-model="editedItem.file" label="Insert File" prepend-icon="mdi-paperclip" required></v-file-input>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveNewRecord">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  
  
        </v-toolbar>
      </template>
  
  
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.first_name }} {{ item.middle_name }} {{ item.last_name }} {{ item.extension }}</td>
          <td>{{ item.student_id }}</td>
          <td>{{ item.student_lrn }}</td>
          <td>{{ item.grade_level }}</td>
          <td>{{ item.strand }}</td>
          <td>
            <v-icon class="me-2" size="small" style="color: #2F3F64" @click="viewRecords(item)">mdi-eye</v-icon>
            <v-icon size="small" style="color: #2F3F64" @click="deleteItem(item)">mdi-delete</v-icon>
          </td>
        </tr>
         
        <tr v-if="item.showRecords">
    <td :colspan="headers.length + 1">
      <v-card class="mb-4" v-for="(record, index) in item.records" :key="index" elevation="2" color="--light">
        <v-card-title class="d-flex align-center justify-space-between cursor-pointer" @click="toggleRecordEdit(item, record)">
          <div>{{ record.title }}</div>
          <v-icon @click.stop="deleteRecord(item, index)" class="mx-2">mdi-delete</v-icon>
        </v-card-title>
        <v-expand-transition>
          <div v-if="record.editing" class="px-4 pb-4" style="max-height: 300px; overflow-y: auto;">
            <v-text-field v-model="record.title" label="Title"></v-text-field>
            <v-text-field v-model="record.score" label="Score"></v-text-field>
            <v-btn @click="saveRecord(item, record)" color=#2F3F64>Save</v-btn>
          </div>
        </v-expand-transition>
      </v-card>
    </td>
  </tr>
  
  
        <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  
      </template>
    </v-data-table>
  
  </template>
  
  <script>
  export default {
    data() {
      return {
      
        dialog: false,
        editedItem: {
          student_id: '',
          title: '',
          score: '',
          file: null,
        },
  
        search: '',
        headers: [
          { title: 'Name', align: 'start', key: 'full_name' },
          { title: 'Student ID', key: 'student_id' },
          { title: 'LRN', key: 'student_lrn' },
          { title: 'Grade Level', key: 'grade_level' },
          { title: 'Strand', key: 'strand' },
          { title: 'Actions', sortable: false },
        ],
        viewingRecords: false,
        students: [
          {
            student_id: '2021001',
            student_lrn: '1234567890',
            grade_level: '10',
            strand: 'STEM',
            email: 'john.doe@example.com',
            first_name: 'John',
            middle_name: '',
            last_name: 'Doe',
            extension: '',
            sex_at_birth: 'Male',
            birth_date: '1999-05-15',
            full_name: 'John Doe',
            records: [
              { id: 1, title: 'Entrance Exam 1', date: '2024-04-30', score: '90', editing: false },
              { id: 2, title: 'Entrance Exam 2', date: '2024-04-29', score: '100', editing: false },
            ],
          },
        ],
        dialogDelete: false,
        deleteRecordIndex: -1,
      };
    },
    computed: {
      displayedStudents() {
        const searchTerm = this.search.toLowerCase();
        return this.students.filter((student) =>
          Object.values(student).some(
            (value) =>
              typeof value === 'string' && value.toLowerCase().includes(searchTerm)
          )
        );
      },
    },
    methods: {
      openDialog() {
      this.dialog = true;
    },
      closeDialog() {
      this.dialog = false;
    },
      viewRecords(student) { 
        student.showRecords = !student.showRecords;
        this.viewingRecords = !this.viewingRecords; 
      },
      toggleRecordEdit(student, record) {
        record.editing = !record.editing;
      },
      deleteRecord(student, index) {
        this.dialogDelete = true;
        this.deleteRecordIndex = index;
      },
      deleteItemConfirm() {
        const student = this.students.find((s) => s.showRecords);
        if (student && this.deleteRecordIndex !== -1) {
          student.records.splice(this.deleteRecordIndex, 1);
          this.dialogDelete = false;
          this.deleteRecordIndex = -1;
        }
      },
      
      closeDelete() {
        this.dialogDelete = false;
        this.deleteRecordIndex = -1;
      },
      NewRecord() {
        this.showNewRecordDialogue = true;
      },
      getFileUrl(file) {
        // Assuming the file is stored in the same directory as the app
        return require(`@/assets/${file}`);
      },
      saveNewRecord() {
        // Associate the new record with the corresponding student using the entered student ID
        const student = this.students.find((s) => s.student_id === this.editedItem.student_id);
        if (student) {
          // Show confirmation message before saving new record
          if (confirm('Are you sure you want to save this new record?')) {
            student.records.push({
              title: this.editedItem.title,
              score: this.editedItem.score,
            });
            this.closeDialog();
          }
        } else {
          // Handle case when student ID is not found
          alert('Student ID not found!');
        }
      },
      saveRecord(student, record) {
        // Show confirmation message before saving edited record
        if (confirm('Are you sure you want to save this edited record?')) {
          record.editing = false;
          // Optionally, you can add code here to save the edited record to the database
        }
      },
    },
  
  
  };
  </script>
  
  <style>
  .v-card:hover {
    background-color: #f0f0f0; /* Set the hover color here */
  }
  
  </style>
  