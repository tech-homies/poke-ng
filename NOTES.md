_users = toSignal(this.trainersApi.getAll(), { initialValue: [] });
users = linkedSignal(() => this._users());
users2 = httpResource<TrainerDTO[]>(() => `${environment.apiUrl}/trainers`);

public addUser(): void {
this.users2.update((users) => users!.concat({ id: 0, name: 'New UserCard', avatarUrl: '' }));
this.users.update((users) => users.concat({ id: 0, name: 'New UserCard', avatarUrl: '' }));
}
