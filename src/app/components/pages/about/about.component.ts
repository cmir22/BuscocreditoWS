import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../../posts/post.service';
import { PostI } from 'src/app/shared/models/post.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from '../../posts/new-post/new-post.component';
import { ModalComponent } from '../../../shared/component/modal/modal.component';
import { UserI } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as firebase from 'firebase';
import { NewFinancieraComponent } from 'src/app/new-financiera/new-financiera.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nameUser',
    'moneyPost',
    'monthPost',
    'tagsPost',
    'actions',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private postSvc: PostService,
    public dialog: MatDialog,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {
    this.postSvc
      .getAllPosts()
      .subscribe((posts) => (this.dataSource.data = posts));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //----------------------------------------------------------
  public newPostForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  private initValuesForm(user: UserI): void {
    this.newPostForm.patchValue({
      email: user.email,
    });
  }

  //----------------------------------------------------------
  onEditPost(post: PostI) {
    console.log('Edit post', post);
    this.openDialog(post);
  }

  onDeletePost(post: PostI) {
    console.log('Delete post', post);

    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Esto no podra ser Revertido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'black',
      cancelButtonColor: 'red',
      confirmButtonText: 'Si, Acepto',
    }).then((result) => {
      if (result.value) {
        // Desea Borra
        this.postSvc
          .deletePostById(post)
          .then(() => {
            Swal.fire('Borrado', 'El post ha sido Borrado', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Ha existido un eror', 'error');
          });
        //console.log('Borrar');
      }
    });
  }

  onNewPost() {
    this.openDialogNew();
    //console.log("Nueva Solicitud")
  }

  public openDialog(post?: PostI): void {
    const config = {
      data: {
        message: post ? 'Editar Post' : 'New Post',
        content: post,
      },
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result ${result}');
    });
  }

  onLogout(): void {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
    });
  }

  public openDialogNew(post?: PostI): void {
    const config = {
      data: {
        message: post ? 'Edit Post' : 'New Post',
        content: post,
      },
    };
    const dialogRef = this.dialog.open(NewPostComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result ${result}');
    });
  }

  openDialogRegister() {
    this.dialog.open(NewFinancieraComponent, {
      width: '500px',
      height: '540px',
    });
  }

}
