import { Car } from '@modules/car/infra/typeorm/entities/car';
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('rentals')
class Rental {
  @PrimaryColumn()
  id:string;
  @Column()
  user_id: string; // fk

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car:Car;

  @Column()
  car_id: string; // fk
  @Column()
  start_date: Date;
  @Column()
  end_date: Date;
  @Column()
  expected_return_date: Date;
  @Column()
  total: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Rental };
