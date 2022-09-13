// Judul Unit Testing -> describe
// Menerima dua buah parameter -> string, function

import { fakeAsync, tick } from "@angular/core/testing";
import { from, lastValueFrom, Observable } from "rxjs";
import { Todo } from "./pages/todos/model/todo.model";

// Describe bisa nested, describe -> describe
describe('1. My First unit testing spec', () => {
  describe('1.1 Group 1 variable "one"', () => {
    // untuk memberikan test skenario kita menggunakan sebuah keyword it
    // it tidak bisa di define diluar describe
    // it bisa lebih dari 1
    // it itu tidak bisa nested
    const one: number = 1;
    const todo: Todo = { id: "1", name: 'Makan', isCompleted: false }
    it('should have value as 1', () => {
      // expect -> test case dari sebuah skenario
      // expect hanya berada pada it
      // expect bisa lebih dari 1
      // expect itu bisa digunakan dengan si mathcer e.g toBe, toEqual dll
      expect(one).toBe(1);
    });

    it('should be instance of Number', () => {
      expect(one).toBeInstanceOf(Number);
    });

    it('should have value name is "makan"', () => {
      expect(todo.name).toBe('Makan');
    });

    it('should be instance of Todo', () => {
      expect(todo).toBeInstanceOf(Object);
    })
  });
  xdescribe('1.2 Group 2', () => {

    it('should have value ...', () => {

    })
  });
});

describe('2. Simple unit test with matcher', () => {
  // cek sebuah tipe data primitive
  // boolean, number, string, null, undefined
  describe('2.1 Test Scenario for primitive data types', () => {
    const one: number = 1;
    const message: string = 'hai';
    const isDone: boolean = true;
    const x: undefined = undefined;
    const y: null = null;
    const z: unknown = '';

    it('one should have value as 1', () => {
      expect(one).toBe(1);
    })

    it('message should have value as "hai"', () => {
      expect(message).toBe('hai');
    })

    it('isDone should have value as true', () => {
      expect(isDone).toBe(true)
    })

    it('isDone should have value as false', () => {
      expect(isDone).not.toBe(false)
    })

    it('x should have value as undefined', () => {
      expect(x).toBeUndefined()
    })

    it('y should have value as null', () => {
      expect(y).toBeNull()
    })
  });

  describe('2.2 Test Scenario for Object and array', () => {
    const todo: Todo = { id: "1", name: 'Makan', isCompleted: false }
    const todos: Todo[] = [{ id: "1", name: 'Makan', isCompleted: false }]
    const todoExpect = { ...todo }
    const todoActual = { ...todo }

    it('todoActual should be EQUAL to todoExpect', () => {
      expect(todoActual).toEqual(todoExpect);
    })

    it('todos should have length as 1', () => {
      expect(todos.length).toBe(1)
    })
  })

});

describe('3. Asynchronous test scenario', () => {
  describe('3.1 fakeAsync()', () => {
    it('asynchronous test without fakeAsync', (done) => {
      let isDone: boolean = false;
      setTimeout(() => {
        isDone = !isDone;
        expect(isDone).toBeTrue();
        done();
      }, 1000);
    });

    it('asynchronous test with fakeAsync', fakeAsync(() => {
      let isDone: boolean = false;
      setTimeout(() => {
        isDone = !isDone;
        // expect(isDone).toBeTrue();
      }, 1000);
      tick(500);
      expect(isDone).toBeFalse();
      tick(200);
      expect(isDone).toBeFalse();
      tick(300);
      expect(isDone).toBeTrue();
    }))
  })

  describe('3.1 Callback, Promise, Observable', () => {
    // callback
    function fetchCallback(cb: (data: string) => void): void {
      setTimeout(() => {
        cb('Enigmacamp');
      }, 1000);
    }
    // promise
    const fetchPromise = (): Promise<string> => {
      return new Promise((resolve, reject) => {
        fetchCallback(resolve);
      })
    }
    // observable
    const fetchObservable = (): Observable<string> => from(fetchPromise());
    const expected: string = 'Enigmacamp';

    describe('3.1.1 Test scenario for cb function', () => {
      it(`actual should have value as ${expected}`, (done) => {
        fetchCallback((actual) => {
          expect(actual).toBe(expected);
          expect(actual).toMatch(expected);
          done();
        })
      })
    })

    describe('3.1.2 Test scenario for promise', () => {
      it(`promise: actual should have value as ${expected}`, fakeAsync(() => {
        fetchPromise().then((actual) => {
          expect(actual).toBe(expected);
          expect(actual).toMatch(expected);
        })
        tick(1000);
      }))

      it(`async-await: actual should have value as ${expected}`, async () => {
        const actual = await fetchPromise();
        expect(actual).toBe(expected);
        expect(actual).toMatch(expected);
      })
    })

    describe('3.1.3 Test scenario for observable', () => {
      it(`obsrvable: actual should have value as ${expected}`, fakeAsync(() => {
        fetchObservable().subscribe((actual) => {
          expect(actual).toBe(expected);
          expect(actual).toMatch(expected);
        })
        tick(1000);
      }))

      it(`obsrvable.toPromise: actual should have value as ${expected}`, async () => {
        const actual = await fetchObservable().toPromise();
        expect(actual).toBe(expected);
        expect(actual).toMatch(expected);
      })

      it(`obsrvable.lastValueFrom: actual should have value as ${expected}`, async () => {
        const actualObervablePromise = await lastValueFrom(fetchObservable());
        expect(actualObervablePromise).toMatch(expected);
      })
    })
  })
})
